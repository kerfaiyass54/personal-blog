package com.blogproject.blogproject.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "questions")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Question {

    @Id
    private String id;
    private String answer;
    private String content;
    private String hint;
}
