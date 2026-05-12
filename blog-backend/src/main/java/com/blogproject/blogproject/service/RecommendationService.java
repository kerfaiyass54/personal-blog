package com.blogproject.blogproject.service;

import com.blogproject.blogproject.entities.Recommendation;

import com.blogproject.blogproject.kafka.
        RecommendationProducer;

import com.blogproject.blogproject.repository.
        RecommendationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationProducer producer;

    private final RecommendationRepository repository;

    public RecommendationService(
            RecommendationProducer producer,
            RecommendationRepository repository
    ) {

        this.producer = producer;
        this.repository = repository;
    }

    /* ========================= */
    /* GENERATE AI RECOMMENDATIONS */
    /* ========================= */

    public void generateRecommendations(
            String email
    ) {

        producer.requestRecommendations(email);
    }

    /* ========================= */
    /* GET ALL */
    /* ========================= */

    public Iterable<Recommendation> all() {

        return repository.findAll();
    }

    /* ========================= */
    /* FILTER BY AUTHOR */
    /* ========================= */

    public List<Recommendation> findByAuthor(
            String author
    ) {

        return repository.findByAuthorContainingIgnoreCase(author);
    }

    /* ========================= */
    /* FILTER BY TYPE */
    /* ========================= */

    public List<Recommendation> findByType(
            String type
    ) {

        return repository.findByPlatform(type);
    }
}