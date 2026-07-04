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
    public long getFavoriteSkillsCount(String email) {
        return favoriteRepository.countFavoritesByUserEmail(email);
    }

    /**
     * PB-106
     */
    public long getReadLessonsCount(String email) {
        return lessonReadingRepository.countByEmailUserAndReadTrue(email);
    }

    /**
     * PB-103
     */
    public long getSubmittedQuizzesCount(String email) {
        return userQuizResultRepository.countByUserEmail(email);
    }

    /**
     * Dashboard statistics
     */
    public Map<String, Long> getAllStatistics(String email) {

        Map<String, Long> stats = new HashMap<>();

        stats.put("favoriteSkills", getFavoriteSkillsCount(email));
        stats.put("readLessons", getReadLessonsCount(email));
        stats.put("submittedQuizzes", getSubmittedQuizzesCount(email));

        return stats;
    }
}