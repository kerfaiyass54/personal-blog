package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.SkillRecommendation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SkillRecommendationRepository extends MongoRepository<SkillRecommendation,String> {

    Optional<SkillRecommendation> findBySkillName(String skillName);

    Optional<SkillRecommendation> findTopByFieldOrderByIdDesc(String field);
}