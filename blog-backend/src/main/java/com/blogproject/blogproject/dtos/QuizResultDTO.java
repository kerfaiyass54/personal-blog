package com.blogproject.blogproject.dtos;

import lombok.*;

import java.util.List;

@Data
@Builder
public class QuizResultDTO {

    private Integer totalQuestions;

    private Integer correctAnswers;

    private Double scorePercentage;

    private List<QuestionResultDTO> questions;
}