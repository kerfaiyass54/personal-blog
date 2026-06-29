package com.blogproject.blogproject.dtos;

import lombok.Data;

@Data
public class UpdateLessonRequest {

    private String title;

    private String content;
}