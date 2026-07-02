package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Question;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository
        extends MongoRepository<Question, String> {

    List<Question> findByQuizId(
            String quizId
    );
}