package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "saveds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "user_article_unique",
        def = "{'userEmail': 1, 'articleId': 1}",
        unique = true
)
public class Saved {

    @Id
    private String id;

    @NotBlank(message = "User email is required")
    @Indexed
    private String userEmail;

    @NotBlank(message = "Article ID is required")
    @Indexed
    private String articleId;
}