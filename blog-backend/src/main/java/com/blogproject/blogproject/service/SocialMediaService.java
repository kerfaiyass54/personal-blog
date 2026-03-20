package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.SocialMediaCreation;
import com.blogproject.blogproject.dtos.SocialMediaDTO;
import com.blogproject.blogproject.entities.SocialMedia;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.SocialMediaRepository;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.ConvertListToPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SocialMediaService {

    private final SocialMediaRepository socialMediaRepository;

    private final UserRepository userRepository;

    public SocialMediaService(SocialMediaRepository socialMediaRepository, UserRepository userRepository) {
        this.socialMediaRepository = socialMediaRepository;
        this.userRepository = userRepository;
    }

    public SocialMediaDTO convertToDTO(SocialMedia socialMedia) {
        SocialMediaDTO socialMediaDTO = new SocialMediaDTO();
        socialMediaDTO.setName(socialMedia.getName());
        socialMediaDTO.setLink(socialMedia.getLink());
        socialMediaDTO.setDescription(socialMedia.getDescription());
        socialMediaDTO.setId(socialMedia.getId());
        socialMediaDTO.setUserName(socialMedia.getUser().getName());
        socialMediaDTO.setUserEmail(socialMedia.getUser().getEmail());
        return socialMediaDTO;
    }


    public SocialMediaDTO saveSocialMedia(SocialMediaCreation  socialMediaCreation, String name, String email) {
        SocialMedia socialMedia = new SocialMedia();
        socialMedia.setName(name);
        socialMedia.setLink(email);
        socialMedia.setDescription(socialMediaCreation.getDescription());
        User user = userRepository.findUserByEmail(email);
        socialMedia.setUser(user);
        SocialMedia socialMedia1 = socialMediaRepository.save(socialMedia);
        return convertToDTO(socialMedia1);
    }

    public SocialMediaDTO getSocialMediaById(String id) {
        Optional<SocialMedia> socialMedia = socialMediaRepository.findById(id);
        return socialMedia.map(this::convertToDTO).orElse(null);
    }

    public Page<SocialMediaDTO> getSocialMediaByPage(int page, int size, String email) {
        User user = userRepository.findUserByEmail(email);
        Pageable pageable = PageRequest.of(page, size);
        List<SocialMediaDTO> socialMedia = user.getSocialMediaList().stream().map(this::convertToDTO).toList();
        return ConvertListToPage.convertListToPage(socialMedia, pageable);
    }

    public void deleteSocialMediaById(String id) {
        socialMediaRepository.deleteById(id);
    }

    public void updateSocialMediaById(String id, SocialMediaDTO socialMediaDTO) {
        Optional<SocialMedia> socialMedia = socialMediaRepository.findById(id);
        if (socialMedia.isPresent()) {
            socialMedia.get().setName(socialMediaDTO.getName());
            socialMedia.get().setLink(socialMediaDTO.getLink());
            socialMedia.get().setDescription(socialMediaDTO.getDescription());
            socialMediaRepository.save(socialMedia.get());
        }
    }

    public boolean isLinkUsed(String link) {
        return socialMediaRepository.findSocialMediaByLink(link) != null;
    }
}
