package com.blogproject.blogproject.entities;

import lombok.*;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Document(collection = "recommendations")

public class Recommendation {

    @Id
    private String id;

    private String email;

    private String title;

    private String author;

    private String link;

    private String platform;

    private Double score;

    private String sourceUser;

}