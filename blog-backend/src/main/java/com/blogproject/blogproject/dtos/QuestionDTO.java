package com.blogproject.blogproject.dtos;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {

    private String content;

    private List<String> possibilities;

    private String answer;

    private String hint;
}