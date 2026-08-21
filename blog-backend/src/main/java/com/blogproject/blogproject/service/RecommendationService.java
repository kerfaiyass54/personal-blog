package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.RecommendationRequest;
import com.blogproject.blogproject.entities.Recommendation;
import com.blogproject.blogproject.kafka.RecommendationProducer;
import com.blogproject.blogproject.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecommendationService {

    private final RecommendationProducer recommendationProducer;
    private final RecommendationRepository recommendationRepository;


    // =========================================================
    // REQUEST RECOMMENDATIONS
    // =========================================================

    /**
     * Sends a recommendation request to the AI service through Kafka.
     */
    public void requestRecommendations(
            RecommendationRequest request
    ) {

        recommendationProducer.requestRecommendations(request);
    }


    // =========================================================
    // SAVE RECOMMENDATION
    // =========================================================

    /**
     * Saves the recommendation result received from the AI service.
     */
    public Recommendation saveRecommendation(
            Recommendation recommendation
    ) {

        if (recommendation.getCreatedAt() == null) {
            recommendation.setCreatedAt(Instant.now());
        }

        return recommendationRepository.save(recommendation);
    }


    // =========================================================
    // FIND ALL
    // =========================================================

    @Transactional(readOnly = true)
    public List<Recommendation> findAll() {

        return recommendationRepository.findAll();
    }


    // =========================================================
    // FIND BY EMAIL
    // =========================================================

    @Transactional(readOnly = true)
    public List<Recommendation> findRecommendationsByEmail(
            String email
    ) {

        return recommendationRepository
                .findByEmail(email);
    }


    // =========================================================
    // FIND BY USER ID
    // =========================================================

    @Transactional(readOnly = true)
    public List<Recommendation> findRecommendationsByUserId(
            String userId
    ) {

        return recommendationRepository
                .findByUserId(userId);
    }
}