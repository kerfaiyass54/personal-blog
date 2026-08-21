package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SocialMediaCreation;
import com.blogproject.blogproject.dtos.SocialMediaDTO;
import com.blogproject.blogproject.enums.SocialMediaType;
import com.blogproject.blogproject.service.SocialMediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/social-media")
@RequiredArgsConstructor
public class SocialMediaController {

    private final SocialMediaService socialMediaService;


    // =========================================================
    // CREATE
    // =========================================================

    @PostMapping
    public ResponseEntity<SocialMediaDTO> createSocialMedia(
            @Valid @RequestBody SocialMediaCreation creation,
            @RequestParam String email
    ) {

        SocialMediaDTO socialMedia =
                socialMediaService.saveSocialMedia(
                        creation,
                        email
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(socialMedia);
    }


    // =========================================================
    // GET BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<SocialMediaDTO> getSocialMedia(
            @PathVariable String id
    ) {

        SocialMediaDTO socialMedia =
                socialMediaService.getSocialMediaById(id);

        return ResponseEntity.ok(socialMedia);
    }


    // =========================================================
    // GET USER SOCIAL MEDIA
    // =========================================================

    @GetMapping
    public ResponseEntity<Page<SocialMediaDTO>> getUserSocialMedia(
            @RequestParam String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<SocialMediaDTO> socialMedia =
                socialMediaService.getSocialMediaByPage(
                        page,
                        size,
                        email
                );

        return ResponseEntity.ok(socialMedia);
    }


    // =========================================================
    // GET BY TYPE
    // =========================================================

    @GetMapping("/type/{type}")
    public ResponseEntity<Page<SocialMediaDTO>> getSocialMediaByType(
            @PathVariable SocialMediaType type,
            @RequestParam String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<SocialMediaDTO> socialMedia =
                socialMediaService.getSocialMediaByType(
                        page,
                        size,
                        type,
                        email
                );

        return ResponseEntity.ok(socialMedia);
    }


    // =========================================================
    // UPDATE
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<SocialMediaDTO> updateSocialMedia(
            @PathVariable String id,
            @Valid @RequestBody SocialMediaDTO socialMediaDTO,
            @RequestParam String email
    ) {

        SocialMediaDTO updated =
                socialMediaService.updateSocialMediaById(
                        id,
                        socialMediaDTO,
                        email
                );

        return ResponseEntity.ok(updated);
    }


    // =========================================================
    // DELETE
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSocialMedia(
            @PathVariable String id,
            @RequestParam String email
    ) {

        socialMediaService.deleteSocialMediaById(
                id,
                email
        );

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // CHECK LINK
    // =========================================================

    @GetMapping("/link/used")
    public ResponseEntity<Boolean> isLinkUsed(
            @RequestParam String link
    ) {

        return ResponseEntity.ok(
                socialMediaService.isLinkUsed(link)
        );
    }
}