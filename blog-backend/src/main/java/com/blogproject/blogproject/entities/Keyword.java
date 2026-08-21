package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "keywords")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {

    @Id
    private String id;

    @NotBlank(message = "Keyword name is required")
    @Size(max = 100, message = "Keyword name cannot exceed 100 characters")
    @Indexed
    private String name;

    @NotBlank(message = "Skill name is required")
    @Size(max = 100, message = "Skill name cannot exceed 100 characters")
    @Indexed
    private String skillName;
}