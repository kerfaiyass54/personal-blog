package com.blogproject.blogproject.dtos;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SkillCreateDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String field;
}
