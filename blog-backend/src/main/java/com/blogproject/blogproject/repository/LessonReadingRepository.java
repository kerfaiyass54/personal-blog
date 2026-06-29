package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.LessonReading;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LessonReadingRepository extends MongoRepository<LessonReading, String> {

    Optional<LessonReading> findByLessonIdAndEmailUser(
            String lessonId,
            String emailUser
    );

    List<LessonReading> findByEmailUser(String emailUser);

    List<LessonReading> findByEmailUserAndReadTrue(String emailUser);
}