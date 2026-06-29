package com.blogproject.blogproject.dtos;

import lombok.Data;

@Data
public class CreateLessonRequest {

    private String title;

    private String content;
}