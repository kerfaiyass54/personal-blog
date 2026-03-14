package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.ProfileAddDTO;
import com.blogproject.blogproject.dtos.ProfileEditableDTO;
import com.blogproject.blogproject.entities.Interest;
import com.blogproject.blogproject.entities.Profile;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.InterestRepository;
import com.blogproject.blogproject.repository.ProfileRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final InterestRepository interestRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository,UserRepository userRepository, InterestRepository interestRepository) {
        this.profileRepository = profileRepository;
        this.interestRepository = interestRepository;
        this.userRepository = userRepository;
    }


    public Interest getInterest(String interestName){
        Optional<Interest> interest = interestRepository.findByName(interestName);
        return interest.orElse(null);
    }

    public ProfileEditableDTO profileToEditable(Profile profile){
        ProfileEditableDTO profileEditableDTO = new ProfileEditableDTO();
        profileEditableDTO.setFirstName(profile.getFirstName());
        profileEditableDTO.setLastName(profile.getLastName());
        profileEditableDTO.setCity(profile.getCity());
        profileEditableDTO.setJob(profile.getJob());
        profileEditableDTO.setBirthDate(profile.getBirthDate());
        profileEditableDTO.setNationality(profile.getNationality());
        profileEditableDTO.setInterestsName(profile.getInterests().stream().map(Interest::getName).toList());
        return profileEditableDTO;
    }

    public User getUser(String username){
        Optional<User> user = userRepository.findByName(username);
        return user.orElse(null);
    }

    public ProfileEditableDTO addProfile(ProfileAddDTO profileAddDTO, String username){
        Profile  profile = new Profile();
        profile.setFirstName(profileAddDTO.getFirstName());
        profile.setLastName(profileAddDTO.getLastName());
        profile.setJob(profileAddDTO.getJob());
        profile.setBirthDate(profileAddDTO.getBirthDate());
        profile.setNationality(profileAddDTO.getNationality());
        profile.setCity(profileAddDTO.getCity());
        profile.setInterests(profileAddDTO.getInterests().stream().map(this::getInterest).toList());
        profile.setUser(getUser(username));
        profileRepository.save(profile);
        return profileToEditable(profile);
    }

    public ProfileEditableDTO getProfile(String username){
        Optional<User>  user = userRepository.findByName(username);
        return user.map(value -> profileToEditable(value.getProfile())).orElse(null);
    }

    public void editProfile(String id, ProfileEditableDTO profileEditableDTO){
        Optional<Profile> profile = profileRepository.findById(id);
        if(profile.isPresent()){
            profile.get().setFirstName(profileEditableDTO.getFirstName());
            profile.get().setLastName(profileEditableDTO.getLastName());
            profile.get().setJob(profileEditableDTO.getJob());
            profile.get().setBirthDate(profileEditableDTO.getBirthDate());
            profile.get().setNationality(profileEditableDTO.getNationality());
            profile.get().setCity(profileEditableDTO.getCity());
            profile.get().setInterests(profileEditableDTO.getInterestsName().stream().map(this::getInterest).toList());
            profileRepository.save(profile.get());
        }
    }




}
