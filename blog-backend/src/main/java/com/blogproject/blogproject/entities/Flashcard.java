package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flashcards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flashcard {

    @Id
    private String id;

    @NotBlank(message = "Lesson ID is required")
    @Indexed
    private String lessonId;

    @NotBlank(message = "Lesson title is required")
    private String lessonTitle;

    @NotBlank(message = "Flashcard type is required")
    private String type;

    @NotBlank(message = "Term is required")
    private String term;

    @NotBlank(message = "Value is required")
    private String value;
}