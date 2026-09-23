package com.blogproject.blogproject.config;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Component
public class PublicEndpoints {

    private final List<String> patterns = List.of(

            // =====================================================
            // USER
            // =====================================================

            "/user",
            "/user/login",
            "/user/username",
            "/user/email",
            "/user/check-password",
            "/user/**",

            // =====================================================
            // PUBLIC API
            // =====================================================

            "/api/flashcards/**",
            "/api/lessons/**",
            "/api/plans/**",
            "/api/articles/**",
            "/api/favorites/**",
            "/api/skill-keywords/**",
            "/api/keywords/**",

            "/reset/**",
            "/profiles/**",

            "/api/skills/**",
            "/api/skills-recommendations/**",

            "/api/writer/statistics/**",
            "/api/reader/statistics/**",

            "/api/quizzes/**",
            "/sessions/**",
            "/api/saved/**",
            "/api/saved",

            "/api/lesson-readings/**",

            "/api/socials",
            "/api/socials/",
            "/api/socials/**",


            "/users/**",

            "/api/recommendations/**",
            "/api/flashcards/**",
            "/api/flashcards",
            "/api/flashcards/",
            "/api/lesson-readings",
            "/api/lesson-readings/**"

    );

}