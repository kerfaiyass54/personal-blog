package com.blogproject.blogproject.dtos;

import lombok.Data;

import java.util.List;

@Data
public class SubmitQuizRequest {

    private String userId;

    private String quizId;

    private List<QuestionAnswerDTO> answers;
}