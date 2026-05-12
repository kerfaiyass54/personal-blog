package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.RecommendationRequestDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendationProducer {

    private final KafkaTemplate<String, RecommendationRequestDTO> kafkaTemplate;


    public void requestRecommendations(String userId) {

        RecommendationRequestDTO dto =
                new RecommendationRequestDTO(userId);

        kafkaTemplate.send(
                "recommendation_requests",
                dto
        );
    }
}