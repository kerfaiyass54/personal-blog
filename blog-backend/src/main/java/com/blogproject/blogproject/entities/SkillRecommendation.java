package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "skill_recommendations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillRecommendation {

    @Id
    private String id;

    @NotBlank(message = "Skill ID is required")
    @Indexed
    private String skillId;

    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name cannot exceed 100 characters")
    private String skillName;

    @NotBlank(message = "Field is required")
    @Size(max = 100, message = "Field cannot exceed 100 characters")
    private String field;

    @NotEmpty(message = "Recommendations cannot be empty")
    private List<
            @NotBlank(message = "Recommendation cannot be blank")
            @Size(max = 500, message = "Recommendation cannot exceed 500 characters")
                    String
            > recommendations;
}