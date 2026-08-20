package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.RecommendationRequest;
import com.blogproject.blogproject.entities.Recommendation;
import com.blogproject.blogproject.service.RecommendationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService service;

    // --------------------------------
    // GENERATE RECOMMENDATIONS
    // --------------------------------

    @PostMapping
    public String generateRecommandation(
            @RequestBody
            RecommendationRequest request
    ) {

        service.generateRecommendations(
                request
        );

        return "Recommendation request sent.";
    }

    // --------------------------------
    // GET ALL
    // --------------------------------

    @GetMapping
    public List<Recommendation> getAllRecommendations() {

        return service.all();
    }

    // --------------------------------
    // GET BY EMAIL
    // --------------------------------

    @GetMapping("/email/{email}")
    public List<Recommendation> getRecommendationsByEmail(
            @PathVariable
            String email
    ) {

        return service.findByEmail(
                email
        );
    }

    // --------------------------------
    // GET BY USER ID
    // --------------------------------

    @GetMapping("/user/{userId}")
    public List<Recommendation> getRecommendationsByUser(
            @PathVariable
            String userId
    ) {

        return service.findByUserId(
                userId
        );
    }
}