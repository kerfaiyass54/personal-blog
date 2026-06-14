package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.FavoriteDTO;
import com.blogproject.blogproject.service.FavoriteSkill;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteSkill favoriteSkill;

    @GetMapping("/{email}")
    public ResponseEntity<List<FavoriteDTO>> getFavoriteSkills(
            @PathVariable String email) {

        return ResponseEntity.ok(
                favoriteSkill.getFavoriteSkills(email)
        );
    }

    @PostMapping("/{email}/{skillId}")
    public ResponseEntity<FavoriteDTO> addFavoriteSkill(
            @PathVariable String email,
            @PathVariable String skillId) {

        FavoriteDTO favorite = favoriteSkill.addFavoriteSkill(email, skillId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(favorite);
    }

    @DeleteMapping("/{email}/{skillId}")
    public ResponseEntity<String> removeFavoriteSkill(
            @PathVariable String email,
            @PathVariable String skillId) {

        favoriteSkill.removeFavoriteSkill(email, skillId);

        return ResponseEntity.ok("Skill removed from favorites");
    }
}