package com.blogproject.blogproject.service;

import com.blogproject.blogproject.entities.SkillRecommendation;
import com.blogproject.blogproject.repository.SkillRecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillRecommandationService {

    private final SkillRecommendationRepository repository;

    public List<String> getLatestRecommendationsByField(String field) {
        return repository
                .findTopByFieldOrderByIdDesc(field)
                .map(SkillRecommendation::getRecommendations)
                .orElse(List.of());
    }
}