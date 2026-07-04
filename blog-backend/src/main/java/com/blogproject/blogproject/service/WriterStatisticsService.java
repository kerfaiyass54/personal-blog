package com.blogproject.blogproject.service;

import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.UserRole;
import com.blogproject.blogproject.repository.ArticleRepository;
import com.blogproject.blogproject.repository.FavoriteRepository;
import com.blogproject.blogproject.repository.LessonRepository;
import com.blogproject.blogproject.repository.QuizRepository;
import com.blogproject.blogproject.repository.SkillRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WriterStatisticsService {

    private final SkillRepository skillRepository;
    private final ArticleRepository articleRepository;
    private final LessonRepository lessonRepository;
    private final FavoriteRepository favoriteRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    /**
     * PB-97
     */
    public long getSkillsCount() {
        return skillRepository.count();
    }

    /**
     * PB-98
     */
    public long getWrittenArticlesCount() {
        return articleRepository.count();
    }

    /**
     * PB-99
     */
    public long getLessonsCount() {
        return lessonRepository.count();
    }

    /**
     * PB-100
     */
    public long getFavoriteSkillsCount() {
        return favoriteRepository.count();
    }

    /**
     * PB-101
     */
    public long getReadersCount() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == UserRole.READER)
                .count();
    }

    /**
     * PB-102
     */
    public long getQuizzesCount() {
        return quizRepository.count();
    }

    /**
     * Dashboard statistics
     */
    public Map<String, Long> getAllStatistics() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("skills", getSkillsCount());
        stats.put("articles", getWrittenArticlesCount());
        stats.put("lessons", getLessonsCount());
        stats.put("favoriteSkills", getFavoriteSkillsCount());
        stats.put("readers", getReadersCount());
        stats.put("quizzes", getQuizzesCount());

        return stats;
    }
}