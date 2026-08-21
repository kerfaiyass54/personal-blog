package com.blogproject.blogproject.entities;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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

import java.util.List;

@Document(collection = "plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Article type is required")
    @Size(max = 100, message = "Article type cannot exceed 100 characters")
    private String articleType;

    @NotBlank(message = "Target audience is required")
    @Size(max = 200, message = "Target audience cannot exceed 200 characters")
    private String targetAudience;

    @NotBlank(message = "Search intent is required")
    @Size(max = 100, message = "Search intent cannot exceed 100 characters")
    private String searchIntent;

    @NotNull(message = "Estimated word count is required")
    @Min(value = 1, message = "Estimated word count must be greater than 0")
    @Max(value = 100000, message = "Estimated word count is too large")
    private Integer estimatedWordCount;

    @NotEmpty(message = "SEO keywords cannot be empty")
    @Size(max = 50, message = "A plan cannot contain more than 50 SEO keywords")
    private List<
            @NotBlank(message = "SEO keyword cannot be blank")
            @Size(max = 100, message = "SEO keyword cannot exceed 100 characters")
                    String
            > seoKeywords;

    @NotEmpty(message = "Outline cannot be empty")
    @Size(max = 50, message = "A plan cannot contain more than 50 sections")
    @Valid
    private List<OutlineSection> outline;
}