package com.blogproject.blogproject.entities;

import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    private String quizId;

    private String content;

    private String answer;

    private String hint;

    private List<String> possibilities;
}