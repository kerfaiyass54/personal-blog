package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.UserQuizResult;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserQuizResultRepository
        extends MongoRepository<UserQuizResult,String> {

    List<UserQuizResult> findByUserEmail(
            String userId
    );

    List<UserQuizResult> findByQuizId(
            String quizId
    );

    long countByUserEmail(String userEmail);

}