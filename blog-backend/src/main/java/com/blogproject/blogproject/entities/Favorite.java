package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(
        name = "user_skill_unique",
        def = "{'userId': 1, 'skillId': 1}",
        unique = true
)
public class Favorite {

    @Id
    private String id;

    @NotNull(message = "User ID is required")
    private String userId;

    @NotNull(message = "Skill ID is required")
    private String skillId;
}