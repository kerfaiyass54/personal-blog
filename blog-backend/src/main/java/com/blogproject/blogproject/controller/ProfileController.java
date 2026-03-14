package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.ProfileAddDTO;
import com.blogproject.blogproject.dtos.ProfileEditableDTO;
import com.blogproject.blogproject.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/profiles")
@CrossOrigin("*")
public class ProfileController {

    private final ProfileService profileService;
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/")
    public ResponseEntity<ProfileEditableDTO> addProfile(@RequestBody ProfileAddDTO profileEditableDTO, @RequestParam String username) {
        ProfileEditableDTO profileEditableDTO1 = profileService.addProfile(profileEditableDTO,username);
        return new ResponseEntity<>(profileEditableDTO1, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileEditableDTO> getProfile(@PathVariable String id){
        return new ResponseEntity<>(profileService.getProfile(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProfile(@PathVariable String id, @RequestBody ProfileEditableDTO profileEditableDTO){
        profileService.editProfile(id, profileEditableDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
