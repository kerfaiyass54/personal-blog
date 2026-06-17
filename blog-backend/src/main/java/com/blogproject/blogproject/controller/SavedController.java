package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SavedDTO;
import com.blogproject.blogproject.service.SavedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved")
@RequiredArgsConstructor
public class SavedController {

    private final SavedService savedService;

    /**
     * Save article
     */
    @PostMapping
    public ResponseEntity<SavedDTO> saveArticle(
            @RequestParam String userEmail,
            @RequestParam String articleId) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedService.saveArticle(
                        userEmail,
                        articleId
                ));
    }

    /**
     * Check my saved articles
     */
    @GetMapping("/{userEmail}")
    public ResponseEntity<List<SavedDTO>> getMySavedArticles(
            @PathVariable String userEmail) {

        return ResponseEntity.ok(
                savedService.getSavedArticles(userEmail)
        );
    }

    /**
     * Remove saved article
     */
    @DeleteMapping
    public ResponseEntity<Void> removeSavedArticle(
            @RequestParam String userEmail,
            @RequestParam String articleId) {

        savedService.removeSavedArticle(
                userEmail,
                articleId
        );

        return ResponseEntity.noContent().build();
    }
}