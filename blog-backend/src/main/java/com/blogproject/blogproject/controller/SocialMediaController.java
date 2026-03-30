package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SocialMediaCreation;
import com.blogproject.blogproject.dtos.SocialMediaDTO;
import com.blogproject.blogproject.enums.SocialMediaType;
import com.blogproject.blogproject.service.SocialMediaService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/socials")
@CrossOrigin("*")
public class SocialMediaController {

    private final SocialMediaService socialMediaService;

    public SocialMediaController(SocialMediaService socialMediaService) {
        this.socialMediaService = socialMediaService;
    }


    @PostMapping("/")
    public ResponseEntity<SocialMediaDTO> createSocialMedia(@RequestBody SocialMediaCreation socialMediaCreation, @RequestParam String email){
        SocialMediaDTO socialMediaDTO = socialMediaService.saveSocialMedia(socialMediaCreation, email);
        return new ResponseEntity<>(socialMediaDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SocialMediaDTO> getSocialMedia(@PathVariable String id){
        SocialMediaDTO socialMediaDTO = socialMediaService.getSocialMediaById(id);
        return new ResponseEntity<>(socialMediaDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSocialMedia(@PathVariable String id){
        socialMediaService.deleteSocialMediaById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Page<SocialMediaDTO>> getAllSocialMedia(@RequestParam int page, @RequestParam int size, @RequestParam String email){
        Page<SocialMediaDTO> socialMediaDTOS = socialMediaService.getSocialMediaByPage(page, size, email);
        return new ResponseEntity<>(socialMediaDTOS, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSocialMedia(@PathVariable String id, @RequestBody SocialMediaDTO socialMediaDTO){
        socialMediaService.updateSocialMediaById(id, socialMediaDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/link/{link}")
    public ResponseEntity<Boolean> isLinkUsed(@PathVariable String link){
        return new ResponseEntity<>(socialMediaService.isLinkUsed(link), HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<Page<SocialMediaDTO>> getSocialMedia(@RequestParam int page, @RequestParam int size, @PathVariable SocialMediaType type, @RequestParam String email){
        Page<SocialMediaDTO> socialMediaDTOS = socialMediaService.getSocialMediaByType(page,size,type,email);
        return new ResponseEntity<>(socialMediaDTOS, HttpStatus.OK);
    }
}
