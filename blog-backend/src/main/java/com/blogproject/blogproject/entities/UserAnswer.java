package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {

    @NotBlank(message = "Question ID is required")
    private String questionId;

    @NotBlank(message = "Selected answer is required")
    @Size(max = 1000, message = "Selected answer cannot exceed 1000 characters")
    private String selectedAnswer;

    @NotBlank(message = "Question content is required")
    @Size(max = 1000, message = "Question content cannot exceed 1000 characters")
    private String questionContent;

    @NotBlank(message = "Correct answer is required")
    @Size(max = 1000, message = "Correct answer cannot exceed 1000 characters")
    private String correctAnswer;

    @NotNull(message = "Correct status is required")
    private Boolean correct;
}