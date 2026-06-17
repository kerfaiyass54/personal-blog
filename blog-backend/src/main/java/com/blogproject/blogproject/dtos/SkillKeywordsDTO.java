package com.blogproject.blogproject.dtos;

import java.util.List;


import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SkillKeywordsDTO {
    private String skill;

    private List<String> keywords;
}
