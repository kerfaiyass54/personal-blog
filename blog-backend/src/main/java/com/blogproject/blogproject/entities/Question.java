package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    @NotBlank(message = "Quiz ID is required")
    @Indexed
    private String quizId;

    @NotBlank(message = "Question content is required")
    @Size(max = 1000, message = "Question content cannot exceed 1000 characters")
    private String content;

    @NotBlank(message = "Answer is required")
    private String answer;

    @Size(max = 500, message = "Hint cannot exceed 500 characters")
    private String hint;

    @NotEmpty(message = "Possibilities cannot be empty")
    private List<
            @NotBlank(message = "Possibility cannot be blank")
                    String
            > possibilities;
}