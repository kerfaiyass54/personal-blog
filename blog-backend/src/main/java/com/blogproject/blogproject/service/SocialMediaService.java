package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SocialMediaCreation;
import com.blogproject.blogproject.dtos.SocialMediaDTO;
import com.blogproject.blogproject.entities.SocialMedia;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.SocialMediaType;
import com.blogproject.blogproject.repository.SocialMediaRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SocialMediaService {

    private final SocialMediaRepository socialMediaRepository;
    private final UserRepository userRepository;


    // =========================================================
    // MAPPING
    // =========================================================

    private SocialMediaDTO mapToDTO(
            SocialMedia socialMedia,
            User user
    ) {

        SocialMediaDTO dto = new SocialMediaDTO();

        dto.setId(socialMedia.getId());
        dto.setName(socialMedia.getName());
        dto.setLink(socialMedia.getLink());
        dto.setDescription(socialMedia.getDescription());
        dto.setSocialMediaType(socialMedia.getType());

        dto.setUserName(user.getName());
        dto.setUserEmail(user.getEmail());

        return dto;
    }


    // =========================================================
    // USER
    // =========================================================

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    // =========================================================
    // CREATE
    // =========================================================

    public SocialMediaDTO saveSocialMedia(
            SocialMediaCreation creation,
            String email
    ) {

        User user = getUserByEmail(email);

        if (socialMediaRepository.existsByLink(creation.getLink())) {
            throw new RuntimeException(
                    "This social media link is already used"
            );
        }

        SocialMedia socialMedia =
                SocialMedia.builder()
                        .name(creation.getName())
                        .link(creation.getLink())
                        .description(creation.getDescription())
                        .type(creation.getSocialMediaType())
                        .userId(user.getId())
                        .build();

        SocialMedia saved =
                socialMediaRepository.save(socialMedia);

        return mapToDTO(saved, user);
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public SocialMediaDTO getSocialMediaById(
            String id
    ) {

        SocialMedia socialMedia =
                socialMediaRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Social media not found"
                                ));

        User user =
                userRepository.findById(socialMedia.getUserId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                ));

        return mapToDTO(socialMedia, user);
    }


    // =========================================================
    // GET BY PAGE
    // =========================================================

    @Transactional(readOnly = true)
    public Page<SocialMediaDTO> getSocialMediaByPage(
            int page,
            int size,
            String email
    ) {

        User user = getUserByEmail(email);

        Pageable pageable =
                PageRequest.of(page, size);

        return socialMediaRepository
                .findByUserId(
                        user.getId(),
                        pageable
                )
                .map(socialMedia ->
                        mapToDTO(socialMedia, user)
                );
    }


    // =========================================================
    // GET BY TYPE
    // =========================================================

    @Transactional(readOnly = true)
    public Page<SocialMediaDTO> getSocialMediaByType(
            int page,
            int size,
            SocialMediaType type,
            String email
    ) {

        User user = getUserByEmail(email);

        Pageable pageable =
                PageRequest.of(page, size);

        return socialMediaRepository
                .findByUserIdAndType(
                        user.getId(),
                        type,
                        pageable
                )
                .map(socialMedia ->
                        mapToDTO(socialMedia, user)
                );
    }


    // =========================================================
    // UPDATE
    // =========================================================

    public SocialMediaDTO updateSocialMediaById(
            String id,
            SocialMediaDTO dto,
            String email
    ) {

        User user = getUserByEmail(email);

        SocialMedia socialMedia =
                socialMediaRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Social media not found"
                                ));

        /*
         * Make sure the user can only modify
         * his own social media.
         */
        if (!socialMedia.getUserId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        /*
         * If the link changes, make sure the new
         * link isn't already used.
         */
        if (!socialMedia.getLink().equals(dto.getLink())
                && socialMediaRepository.existsByLink(dto.getLink())) {

            throw new RuntimeException(
                    "This social media link is already used"
            );
        }

        socialMedia.setName(dto.getName());
        socialMedia.setLink(dto.getLink());
        socialMedia.setDescription(dto.getDescription());
        socialMedia.setType(dto.getSocialMediaType());

        SocialMedia updated =
                socialMediaRepository.save(socialMedia);

        return mapToDTO(updated, user);
    }


    // =========================================================
    // DELETE
    // =========================================================

    public void deleteSocialMediaById(
            String id,
            String email
    ) {

        User user = getUserByEmail(email);

        SocialMedia socialMedia =
                socialMediaRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Social media not found"
                                ));

        if (!socialMedia.getUserId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        socialMediaRepository.delete(socialMedia);
    }


    // =========================================================
    // CHECK LINK
    // =========================================================

    @Transactional(readOnly = true)
    public boolean isLinkUsed(
            String link
    ) {

        return socialMediaRepository.existsByLink(link);
    }
}