package com.blogproject.blogproject.dtos;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SkillRecommendationDTO {

    private String skillName;

    private String field;

    private List<String> recommendations;
}