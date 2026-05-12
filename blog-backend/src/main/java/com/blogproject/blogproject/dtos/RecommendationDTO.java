package com.blogproject.blogproject.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationDTO {

    private String title;

    private String author;

    private String link;

    private String type;

    private Double score;

    private String sourceUser;
}