package com.blogproject.blogproject.entities;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "saveds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Saved {

    @Id
    private String id;

    @NotNull(message = "User is required")
    private String userEmail;

    @NotNull(message = "Article is required")
    private String articleId;
}
