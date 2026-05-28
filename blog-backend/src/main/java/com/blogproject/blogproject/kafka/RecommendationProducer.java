package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.RecommendationRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendationProducer {

    private final KafkaTemplate<String, RecommendationRequest> kafkaTemplate;

    public void requestRecommendations(
            RecommendationRequest request
    ) {

        kafkaTemplate.send(
                "soundtrack-events",
                request
        );

        System.out.println(
                "Recommendation request sent."
        );
    }
}