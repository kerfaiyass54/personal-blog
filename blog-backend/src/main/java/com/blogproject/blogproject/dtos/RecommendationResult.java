package com.blogproject.blogproject.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationResult {

    private String userId;

    private String email;

    private String soundtrackId;

    private List<RecommendationItem> recommendations;
}