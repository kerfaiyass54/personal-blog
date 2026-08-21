package com.blogproject.blogproject.entities;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "user_quiz_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "user_quiz_idx",
        def = "{'userId': 1, 'quizId': 1}"
)
public class UserQuizResult {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;

    @NotBlank(message = "Quiz ID is required")
    @Indexed
    private String quizId;

    @NotBlank(message = "Lesson ID is required")
    @Indexed
    private String lessonId;

    @NotNull(message = "Total questions is required")
    @Min(value = 1, message = "Total questions must be at least 1")
    private Integer totalQuestions;

    @NotNull(message = "Correct answers count is required")
    @Min(value = 0, message = "Correct answers cannot be negative")
    private Integer correctAnswers;

    @NotNull(message = "Score percentage is required")
    @DecimalMin(value = "0.0", message = "Score cannot be less than 0")
    @DecimalMax(value = "100.0", message = "Score cannot exceed 100")
    private Double scorePercentage;

    @CreatedDate
    private Instant completedAt;

    @Valid
    private List<UserAnswer> answers;
}