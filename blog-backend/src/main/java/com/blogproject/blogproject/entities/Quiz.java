package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quizzes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {

    @Id
    private String id;

    @NotBlank(message = "Lesson ID is required")
    @Indexed
    private String lessonId;

    @NotBlank(message = "Lesson title is required")
    private String lessonTitle;

    @Min(value = 1, message = "Number of questions must be at least 1")
    private Integer numberOfQuestions;
}