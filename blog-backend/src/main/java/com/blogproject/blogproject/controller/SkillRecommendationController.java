package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.service.SkillRecommandationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills-recommendations")
@RequiredArgsConstructor
public class SkillRecommendationController {

    private final SkillRecommandationService skillRecommendationService;

    @GetMapping("/{field}")
    public ResponseEntity<List<String>> getLatestRecommendationsByField(
            @PathVariable String field) {

        List<String> recommendations =
                skillRecommendationService.getLatestRecommendationsByField(field);

        if (recommendations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(recommendations);
    }
}