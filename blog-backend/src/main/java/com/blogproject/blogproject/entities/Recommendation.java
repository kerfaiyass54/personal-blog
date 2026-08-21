package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.dtos.RecommendationItem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recommendations")
@CompoundIndex(
        name = "user_soundtrack_idx",
        def = "{'userId': 1, 'soundtrackId': 1}"
)
public class Recommendation {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Soundtrack ID is required")
    @Indexed
    private String soundtrackId;

    @NotEmpty(message = "Recommendations cannot be empty")
    @Valid
    private List<RecommendationItem> recommendations;

    @CreatedDate
    private Instant createdAt;
}