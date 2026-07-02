package com.blogproject.blogproject.dtos;

import lombok.*;

@Data
@Builder
public class QuestionResultDTO {

    private String question;

    private String selectedAnswer;

    private String correctAnswer;

    private Boolean correct;
}