package com.blogproject.blogproject.service;

import com.blogproject.blogproject.repository.FavoriteRepository;
import com.blogproject.blogproject.repository.LessonReadingRepository;
import com.blogproject.blogproject.repository.UserQuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReaderStatisticsService {

    private final FavoriteRepository favoriteRepository;
    private final LessonReadingRepository lessonReadingRepository;
    private final UserQuizResultRepository userQuizResultRepository;

    /**
     * PB-104
     */
    public long getFavoriteSkillsCount(String id) {
        return favoriteRepository.countFavoritesByUserEmail(id);
    }

    /**
     * PB-106
     */
    public long getReadLessonsCount(String id) {
        return lessonReadingRepository.countByEmailUserAndReadTrue(id);
    }

    /**
     * PB-103
     */
    public long getSubmittedQuizzesCount(String id) {
        return userQuizResultRepository.countByUserId(id);
    }

    /**
     * Dashboard statistics
     */
    public Map<String, Long> getAllStatistics(String id) {

        Map<String, Long> stats = new HashMap<>();

        stats.put("favoriteSkills", getFavoriteSkillsCount(id));
        stats.put("readLessons", getReadLessonsCount(id));
        stats.put("submittedQuizzes", getSubmittedQuizzesCount(id));

        return stats;
    }
}