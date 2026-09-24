package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LessonReadingResponse {

    private String id;

    private String lessonName;

    private String emailUser;

    private Integer progress;

    private Boolean read;
}