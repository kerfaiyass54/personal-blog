package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Recommendation;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecommendationRepository
        extends MongoRepository<Recommendation, String> {

    List<Recommendation> findByEmail(
            String email
    );

    List<Recommendation> findByAuthorContainingIgnoreCase(
            String author
    );

    List<Recommendation> findByPlatform(
            String platform
    );
}