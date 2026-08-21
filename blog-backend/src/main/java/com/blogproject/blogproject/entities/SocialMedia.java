package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.SocialMediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "social_medias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialMedia {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be empty")
    @Size(
            min = 2,
            max = 50,
            message = "Name must be between 2 and 50 characters"
    )
    private String name;

    @NotBlank(message = "Link cannot be empty")
    @Size(max = 500, message = "Link cannot exceed 500 characters")
    private String link;

    @Size(
            max = 500,
            message = "Description cannot exceed 500 characters"
    )
    private String description;

    @NotNull(message = "Type is required")
    private SocialMediaType type;

    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
}