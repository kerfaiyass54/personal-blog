package com.blogproject.blogproject.entities;

import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "recommendations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillRecommendation {

    @Id
    private String id;

    private String skillName;

    private String field;

    private List<String> recommendations;
}