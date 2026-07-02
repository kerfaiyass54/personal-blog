package com.blogproject.blogproject.dtos;

import lombok.Data;

import java.util.List;

@Data
public class QuizGeneratedDTO {

    private String lessonId;

    private String lessonTitle;

    private Integer numberOfQuestions;

    private List<QuestionDTO> questions;
}