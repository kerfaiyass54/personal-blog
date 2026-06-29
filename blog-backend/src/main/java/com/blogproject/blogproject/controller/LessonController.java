package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.CreateLessonRequest;
import com.blogproject.blogproject.dtos.LessonResponse;
import com.blogproject.blogproject.dtos.UpdateLessonRequest;
import com.blogproject.blogproject.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @PostMapping
    public ResponseEntity<LessonResponse> createLesson(
            @RequestBody CreateLessonRequest request) {

        LessonResponse lesson = lessonService.createLesson(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(lesson);
    }

    @GetMapping
    public ResponseEntity<List<LessonResponse>> getAllLessons() {

        return ResponseEntity.ok(
                lessonService.getAllLessons()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonResponse> getLessonById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                lessonService.getLessonById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LessonResponse> updateLesson(
            @PathVariable String id,
            @RequestBody UpdateLessonRequest request) {

        return ResponseEntity.ok(
                lessonService.updateLesson(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(
            @PathVariable String id) {

        lessonService.deleteLesson(id);

        return ResponseEntity.noContent().build(); // 204
    }
}