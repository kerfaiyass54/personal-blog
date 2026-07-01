package com.blogproject.blogproject.dtos;

import lombok.Data;

@Data
public class FlashcardDto {

    private String lessonId;

    private String lessonTitle;

    private String type;

    private String term;

    private String value;
}