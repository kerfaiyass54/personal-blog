package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.RecommendationRequest;
import com.blogproject.blogproject.entities.Recommendation;
import com.blogproject.blogproject.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;


    // =========================================================
    // REQUEST RECOMMENDATIONS
    // =========================================================

    @PostMapping
    public ResponseEntity<String> requestRecommendations(
            @Valid @RequestBody RecommendationRequest request
    ) {

        recommendationService.requestRecommendations(request);

        return ResponseEntity.ok(
                "Recommendation request sent."
        );
    }


    // =========================================================
    // GET ALL RECOMMENDATIONS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<Recommendation>> findAllRecommendations() {

        return ResponseEntity.ok(
                recommendationService.findAll()
        );
    }


    // =========================================================
    // GET RECOMMENDATIONS BY EMAIL
    // =========================================================

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Recommendation>> findRecommendationsByEmail(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                recommendationService.findRecommendationsByEmail(email)
        );
    }


    // =========================================================
    // GET RECOMMENDATIONS BY USER ID
    // =========================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> findRecommendationsByUserId(
            @PathVariable String userId
    ) {

        return ResponseEntity.ok(
                recommendationService.findRecommendationsByUserId(userId)
        );
    }
}