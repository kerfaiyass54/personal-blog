package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Quiz;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository
        extends MongoRepository<Quiz, String> {
}