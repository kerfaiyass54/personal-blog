package com.blogproject.blogproject.entities;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {

    private String questionId;

    private String selectedAnswer;

    private String questionContent;

    private String correctAnswer;

    private Boolean correct;
}