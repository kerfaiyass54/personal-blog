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
    @GetMapping("/skills/{id}")
    public ResponseEntity<Long> getFavoriteSkillsCount(
            @PathVariable String id) {

        return ResponseEntity.ok(
                readerStatisticsService.getFavoriteSkillsCount(id)
        );
    }

    /**
     * PB-106
     */
    @GetMapping("/lessons/{id}")
    public ResponseEntity<Long> getReadLessonsCount(
            @PathVariable String id) {

        return ResponseEntity.ok(
                readerStatisticsService.getReadLessonsCount(id)
        );
    }

    /**
     * PB-103
     */
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Long> getSubmittedQuizzesCount(
            @PathVariable String id) {

        return ResponseEntity.ok(
                readerStatisticsService.getSubmittedQuizzesCount(id)
        );
    }

    /**
     * Dashboard
     */
    @GetMapping("/dashboard/{id}")
    public ResponseEntity<Map<String, Long>> getDashboardStatistics(
            @PathVariable String id) {

        return ResponseEntity.ok(
                readerStatisticsService.getAllStatistics(id)
        );
    }
}