package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.ProfileAddDTO;
import com.blogproject.blogproject.dtos.ProfileEditableDTO;
import com.blogproject.blogproject.entities.Interest;
import com.blogproject.blogproject.entities.Profile;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.InterestRepository;
import com.blogproject.blogproject.repository.ProfileRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final InterestRepository interestRepository;
    private final UserRepository userRepository;


    // =========================================================
    // USER
    // =========================================================

    private User getUserByUsername(String username) {

        return userRepository.findByName(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    // =========================================================
    // INTEREST
    // =========================================================

    private Interest getInterest(String interestName) {

        return interestRepository.findByName(interestName)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Interest not found: " + interestName
                        ));
    }


    private List<String> getInterestIds(
            List<String> interestNames
    ) {

        if (interestNames == null || interestNames.isEmpty()) {
            return List.of();
        }

        return interestNames.stream()
                .map(this::getInterest)
                .map(Interest::getId)
                .toList();
    }


    // =========================================================
    // PROFILE → DTO
    // =========================================================

    @Transactional(readOnly = true)
    public ProfileEditableDTO profileToEditable(
            Profile profile
    ) {

        ProfileEditableDTO dto =
                new ProfileEditableDTO();

        dto.setFirstName(profile.getFirstName());
        dto.setLastName(profile.getLastName());
        dto.setCity(profile.getCity());
        dto.setJob(profile.getJob());
        dto.setBirthDate(profile.getBirthDate());
        dto.setNationality(profile.getNationality());

        List<String> interestIds =
                profile.getInterestIds();

        if (interestIds == null || interestIds.isEmpty()) {
            dto.setInterestsName(List.of());
            return dto;
        }

        List<Interest> interests =
                interestRepository.findAllById(interestIds);

        Map<String, Interest> interestMap =
                interests.stream()
                        .collect(Collectors.toMap(
                                Interest::getId,
                                Function.identity()
                        ));

        /*
         * Keep the same order as the IDs stored in Profile.
         */
        List<String> interestNames =
                interestIds.stream()
                        .map(interestMap::get)
                        .filter(java.util.Objects::nonNull)
                        .map(Interest::getName)
                        .toList();

        dto.setInterestsName(interestNames);

        return dto;
    }


    // =========================================================
    // ADD PROFILE
    // =========================================================

    public ProfileEditableDTO addProfile(
            ProfileAddDTO profileAddDTO,
            String username
    ) {

        User user =
                getUserByUsername(username);

        /*
         * Prevent creating multiple profiles for the same user.
         */
        if (profileRepository.existsByUserId(user.getId())) {
            throw new RuntimeException(
                    "Profile already exists for this user"
            );
        }

        List<String> interestIds =
                getInterestIds(
                        profileAddDTO.getInterests()
                );

        Profile profile =
                Profile.builder()
                        .firstName(profileAddDTO.getFirstName())
                        .lastName(profileAddDTO.getLastName())
                        .job(profileAddDTO.getJob())
                        .birthDate(profileAddDTO.getBirthDate())
                        .nationality(profileAddDTO.getNationality())
                        .city(profileAddDTO.getCity())
                        .interestIds(interestIds)
                        .userId(user.getId())
                        .build();

        Profile savedProfile =
                profileRepository.save(profile);

        return profileToEditable(savedProfile);
    }


    // =========================================================
    // GET PROFILE
    // =========================================================

    @Transactional(readOnly = true)
    public ProfileEditableDTO getProfile(
            String username
    ) {

        User user =
                getUserByUsername(username);

        Profile profile =
                profileRepository.findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Profile not found"
                                ));

        return profileToEditable(profile);
    }


    // =========================================================
    // EDIT PROFILE
    // =========================================================

    public void editProfile(
            String id,
            ProfileEditableDTO dto
    ) {

        Profile profile =
                profileRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Profile not found"
                                ));

        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setJob(dto.getJob());
        profile.setBirthDate(dto.getBirthDate());
        profile.setNationality(dto.getNationality());
        profile.setCity(dto.getCity());

        profile.setInterestIds(
                getInterestIds(dto.getInterestsName())
        );

        profileRepository.save(profile);
    }
}