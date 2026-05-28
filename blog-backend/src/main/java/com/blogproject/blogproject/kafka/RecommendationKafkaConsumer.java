package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.RecommendationResult;
import com.blogproject.blogproject.entities.Recommendation;
import com.blogproject.blogproject.service.RecommendationService;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendationKafkaConsumer {

    private final RecommendationService recommendationService;

    private final ObjectMapper objectMapper;

    @KafkaListener(
            topics = "soundtrack-recommendations",
            groupId = "soundtrack-group"
    )
    public void consume(
            String message
    ) {

        try {

            RecommendationResult result =
                    objectMapper.readValue(
                            message,
                            RecommendationResult.class
                    );

            Recommendation recommendation =
                    Recommendation.builder()
                            .userId(result.getUserId())
                            .email(result.getEmail())
                            .soundtrackId(result.getSoundtrackId())
                            .recommendations(
                                    result.getRecommendations()
                            )
                            .build();

            recommendationService.save(
                    recommendation
            );

            System.out.println(
                    "Recommendations saved."
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}