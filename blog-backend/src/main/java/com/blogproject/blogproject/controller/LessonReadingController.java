package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.CreateLessonReadingRequest;
import com.blogproject.blogproject.dtos.LessonReadingResponse;
import com.blogproject.blogproject.dtos.UpdateProgressRequest;
import com.blogproject.blogproject.service.LessonReadingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lesson-readings")
@RequiredArgsConstructor
public class LessonReadingController {

    private final LessonReadingService lessonReadingService;

    @PostMapping
    public ResponseEntity<LessonReadingResponse> createReading(
            @RequestBody CreateLessonReadingRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        lessonReadingService
                                .createReading(request)
                );
    }

    @PutMapping("/{lessonId}/progress")
    public ResponseEntity<LessonReadingResponse> updateProgress(
            @PathVariable String lessonId,
            @RequestParam String emailUser,
            @RequestBody UpdateProgressRequest request) {

        return ResponseEntity.ok(
                lessonReadingService.updateProgress(
                        lessonId,
                        emailUser,
                        request
                )
        );
    }

    @GetMapping("/user/{emailUser}")
    public ResponseEntity<List<LessonReadingResponse>>
    getReadingsByUser(
            @PathVariable String emailUser) {

        return ResponseEntity.ok(
                lessonReadingService
                        .getReadingsByUser(emailUser)
        );
    }

    @GetMapping("/user/{emailUser}/completed")
    public ResponseEntity<List<LessonReadingResponse>>
    getCompletedLessons(
            @PathVariable String emailUser) {

        return ResponseEntity.ok(
                lessonReadingService
                        .getCompletedLessons(emailUser)
        );
    }
}