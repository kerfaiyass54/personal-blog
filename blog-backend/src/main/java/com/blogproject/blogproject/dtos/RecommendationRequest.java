package com.blogproject.blogproject.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {

    private String email;
}