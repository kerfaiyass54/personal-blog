package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.service.WriterStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/writer/statistics")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WriterStatisticsController {

    private final WriterStatisticsService writerStatisticsService;

    /**
     * PB-97
     */
    @GetMapping("/skills")
    public ResponseEntity<Long> getSkillsCount() {
        return ResponseEntity.ok(writerStatisticsService.getSkillsCount());
    }

    /**
     * PB-98
     */
    @GetMapping("/articles")
    public ResponseEntity<Long> getArticlesCount() {
        return ResponseEntity.ok(
                writerStatisticsService.getWrittenArticlesCount()
        );
    }

    /**
     * PB-99
     */
    @GetMapping("/lessons")
    public ResponseEntity<Long> getLessonsCount() {
        return ResponseEntity.ok(
                writerStatisticsService.getLessonsCount()
        );
    }

    /**
     * PB-100
     */
    @GetMapping("/favorite-skills")
    public ResponseEntity<Long> getFavoriteSkillsCount() {
        return ResponseEntity.ok(
                writerStatisticsService.getFavoriteSkillsCount()
        );
    }

    /**
     * PB-101
     */
    @GetMapping("/readers")
    public ResponseEntity<Long> getReadersCount() {
        return ResponseEntity.ok(
                writerStatisticsService.getReadersCount()
        );
    }

    /**
     * PB-102
     */
    @GetMapping("/quizzes")
    public ResponseEntity<Long> getQuizzesCount() {
        return ResponseEntity.ok(
                writerStatisticsService.getQuizzesCount()
        );
    }

    /**
     * Dashboard statistics
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardStatistics() {
        return ResponseEntity.ok(
                writerStatisticsService.getAllStatistics()
        );
    }
}