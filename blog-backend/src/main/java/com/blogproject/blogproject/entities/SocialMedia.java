package com.blogproject.blogproject.entities;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;


@Document(collection = "social_medias")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SocialMedia {


    @Id
    private String id;

    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Link cannot be empty")
    private String link;

    private String description;

    @DBRef
    @Indexed(unique = true)
    private User user;

}
