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

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteSkill {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public List<FavoriteDTO> getFavoriteSkills(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteRepository.findByUser(user)
                .stream()
                .map(favorite -> {
                    FavoriteDTO dto = new FavoriteDTO();
                    dto.setId(favorite.getId());
                    dto.setUserEmail(user.getEmail());
                    dto.setSkillName(favorite.getSkill().getName());
                    return dto;
                })
                .toList();
    }

    public FavoriteDTO addFavoriteSkill(String userEmail, String skillId) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (favoriteRepository.existsByUserAndSkill(user, skill)) {
            throw new RuntimeException("Skill already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setSkill(skill);

        Favorite saved = favoriteRepository.save(favorite);

        FavoriteDTO dto = new FavoriteDTO();
        dto.setId(saved.getId());
        dto.setUserEmail(user.getEmail());
        dto.setSkillName(skill.getName());

        return dto;
    }

    public void removeFavoriteSkill(String userEmail, String skillId) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        Favorite favorite = favoriteRepository
                .findByUserAndSkill(user, skill)
                .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoriteRepository.delete(favorite);
    }
}