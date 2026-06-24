package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlanRepository extends MongoRepository<Plan, String> {
}