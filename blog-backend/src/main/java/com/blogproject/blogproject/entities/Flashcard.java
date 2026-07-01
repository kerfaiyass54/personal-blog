package com.blogproject.blogproject.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flashcards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flashcard {

    @Id
    private String id;

    private String lessonId;

    private String lessonTitle;

    private String type;

    private String term;

    private String value;
}