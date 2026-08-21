package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.FavoriteDTO;
import com.blogproject.blogproject.entities.Favorite;
import com.blogproject.blogproject.entities.Skill;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.FavoriteRepository;
import com.blogproject.blogproject.repository.SkillRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteSkill {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    @Transactional(readOnly = true)
    public List<FavoriteDTO> getFavoriteSkills(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteRepository.findByUserId(user.getId())
                .stream()
                .map(favorite -> {

                    Skill skill = skillRepository.findById(favorite.getSkillId())
                            .orElseThrow(() ->
                                    new RuntimeException("Skill not found")
                            );

                    return toDTO(favorite, user, skill);
                })
                .toList();
    }

    public FavoriteDTO addFavoriteSkill(String userEmail, String skillId) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (favoriteRepository.existsByUserIdAndSkillId(
                user.getId(),
                skill.getId()
        )) {
            throw new RuntimeException("Skill already in favorites");
        }

        Favorite favorite = Favorite.builder()
                .userId(user.getId())
                .skillId(skill.getId())
                .build();

        Favorite saved = favoriteRepository.save(favorite);

        return toDTO(saved, user, skill);
    }

    public void removeFavoriteSkill(String userEmail, String skillId) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        Favorite favorite = favoriteRepository
                .findByUserIdAndSkillId(user.getId(), skillId)
                .orElseThrow(() ->
                        new RuntimeException("Favorite not found")
                );

        favoriteRepository.delete(favorite);
    }

    private FavoriteDTO toDTO(
            Favorite favorite,
            User user,
            Skill skill
    ) {
        FavoriteDTO dto = new FavoriteDTO();

        dto.setId(favorite.getId());
        dto.setUserEmail(user.getEmail());
        dto.setSkillName(skill.getName());

        return dto;
    }
}