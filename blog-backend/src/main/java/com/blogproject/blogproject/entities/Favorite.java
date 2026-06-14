package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@CompoundIndex(
        name = "user_skill_unique",
        def = "{'user': 1, 'skill': 1}",
        unique = true
)
public class Favorite {

    @Id
    private String id;

    @NotNull(message = "User is required")
    @DBRef
    private User user;

    @NotNull(message = "Skill is required")
    @DBRef
    private Skill skill;
}