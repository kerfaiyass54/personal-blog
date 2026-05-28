package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.RecommendationRequest;
import com.blogproject.blogproject.entities.Recommendation;
import com.blogproject.blogproject.kafka.RecommendationProducer;
import com.blogproject.blogproject.repository.RecommendationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationProducer producer;

    private final RecommendationRepository repository;

    // ----------------------------
    // SEND REQUEST TO PYTHON AI
    // ----------------------------

    public void generateRecommendations(
            RecommendationRequest request
    ) {

        producer.requestRecommendations(
                request
        );
    }

    // ----------------------------
    // SAVE RECOMMENDATION RESULTS
    // ----------------------------

    public Recommendation save(
            Recommendation recommendation
    ) {

        recommendation.setCreatedAt(
                Instant.now()
        );

        return repository.save(
                recommendation
        );
    }

    // ----------------------------
    // GET ALL
    // ----------------------------

    public List<Recommendation> all() {

        return repository.findAll();
    }

    // ----------------------------
    // GET BY EMAIL
    // ----------------------------

    public List<Recommendation> findByEmail(
            String email
    ) {

        return repository.findByEmail(
                email
        );
    }

    // ----------------------------
    // GET BY USER
    // ----------------------------

    public List<Recommendation> findByUserId(
            String userId
    ) {

        return repository.findByUserId(
                userId
        );
    }
}