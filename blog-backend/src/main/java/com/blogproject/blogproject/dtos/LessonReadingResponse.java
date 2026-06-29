package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class LessonReadingResponse {

    private String id;

    private String lessonId;

    private String emailUser;

    private Date dateLastRead;

    private Integer progress;

    private Boolean read;
}