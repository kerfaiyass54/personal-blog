package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.service.ReaderStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reader/statistics")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReaderStatisticsController {

    private final ReaderStatisticsService readerStatisticsService;

    /**
     * PB-104
     */
    @GetMapping("/favorite-skills/{email}")
    public ResponseEntity<Long> getFavoriteSkillsCount(
            @PathVariable String email) {

        return ResponseEntity.ok(
                readerStatisticsService.getFavoriteSkillsCount(email)
        );
    }

    /**
     * PB-106
     */
    @GetMapping("/read-lessons/{email}")
    public ResponseEntity<Long> getReadLessonsCount(
            @PathVariable String email) {

        return ResponseEntity.ok(
                readerStatisticsService.getReadLessonsCount(email)
        );
    }

    /**
     * PB-103
     */
    @GetMapping("/submitted-quizzes/{email}")
    public ResponseEntity<Long> getSubmittedQuizzesCount(
            @PathVariable String email) {

        return ResponseEntity.ok(
                readerStatisticsService.getSubmittedQuizzesCount(email)
        );
    }

    /**
     * Dashboard
     */
    @GetMapping("/dashboard/{email}")
    public ResponseEntity<Map<String, Long>> getDashboardStatistics(
            @PathVariable String email) {

        return ResponseEntity.ok(
                readerStatisticsService.getAllStatistics(email)
        );
    }
}