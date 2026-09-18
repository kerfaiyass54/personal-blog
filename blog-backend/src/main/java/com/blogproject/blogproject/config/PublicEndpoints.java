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

            "/api/lesson-readings/**",

            "/socials",
            "/socials/",
            "/socials/**",

            "/users/**",

            "/api/recommendations/**"
    );

}