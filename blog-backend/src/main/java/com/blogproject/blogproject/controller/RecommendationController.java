package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.entities.Recommendation;

import com.blogproject.blogproject.service.
        RecommendationService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/{email}/recommendations")
@CrossOrigin("*")
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(
            RecommendationService service
    ) {

        this.service = service;
    }

    /* ========================= */
    /* GENERATE RECOMMENDATIONS */
    /* ========================= */

    @PostMapping
    public ResponseEntity<String> generate(
            @PathVariable String email
    ) {

        service.generateRecommendations(email);

        return ResponseEntity.ok(
                "Recommendation request sent successfully"
        );
    }

    /* ========================= */
    /* GET ALL */
    /* ========================= */

    @GetMapping
    public ResponseEntity<Iterable<Recommendation>> all() {

        return ResponseEntity.ok(
                service.all()
        );
    }

    /* ========================= */
    /* FILTER BY AUTHOR */
    /* ========================= */

    @GetMapping("/author/{author}")
    public ResponseEntity<Iterable<Recommendation>> byAuthor(
            @PathVariable String author
    ) {

        return ResponseEntity.ok(
                service.findByAuthor(author)
        );
    }

    /* ========================= */
    /* FILTER BY TYPE */
    /* ========================= */

    @GetMapping("/type/{type}")
    public ResponseEntity<Iterable<Recommendation>> byType(
            @PathVariable String type
    ) {

        return ResponseEntity.ok(
                service.findByType(type)
        );
    }
}