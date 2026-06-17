package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkillKeywordRequest {

    private String skillId;
    private String skillName;
    private String field;
}