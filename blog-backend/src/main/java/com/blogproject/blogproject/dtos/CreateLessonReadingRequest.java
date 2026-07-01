package com.blogproject.blogproject.dtos;

import lombok.Data;

@Data
public class CreateLessonReadingRequest {

    private String lessonId;

    private String emailUser;
}