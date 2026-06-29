package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.CreateLessonRequest;
import com.blogproject.blogproject.dtos.LessonResponse;
import com.blogproject.blogproject.dtos.UpdateLessonRequest;
import com.blogproject.blogproject.entities.Lesson;
import com.blogproject.blogproject.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public LessonResponse createLesson(CreateLessonRequest request) {

        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setDateInsert(new Date());

        Lesson saved = lessonRepository.save(lesson);

        return mapToResponse(saved);
    }

    public List<LessonResponse> getAllLessons() {
        return lessonRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public LessonResponse getLessonById(String id) {

        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        return mapToResponse(lesson);
    }

    public LessonResponse updateLesson(String id, UpdateLessonRequest request) {

        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());

        Lesson updated = lessonRepository.save(lesson);

        return mapToResponse(updated);
    }

    public void deleteLesson(String id) {
        lessonRepository.deleteById(id);
    }

    private LessonResponse mapToResponse(Lesson lesson) {
        return new LessonResponse(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getContent(),
                lesson.getDateInsert()
        );
    }
}