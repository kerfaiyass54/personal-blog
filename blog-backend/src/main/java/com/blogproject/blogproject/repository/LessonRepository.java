package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Lesson;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends MongoRepository<Lesson, String> {
}