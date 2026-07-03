package com.blogproject.blogproject.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "user_quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserQuizResult {

    @Id
    private String id;

    private String userEmail;

    private String quizId;

    private String lessonId;

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Double scorePercentage;

    private LocalDateTime completedAt;

    private List<UserAnswer> answers;
}