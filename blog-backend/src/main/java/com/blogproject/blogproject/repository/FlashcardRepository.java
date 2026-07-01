package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Flashcard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FlashcardRepository
        extends MongoRepository<Flashcard, String> {

    List<Flashcard> findByLessonId(
            String lessonId
    );
}