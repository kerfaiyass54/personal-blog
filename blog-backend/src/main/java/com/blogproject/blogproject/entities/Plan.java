package com.blogproject.blogproject.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    private String id;

    private String title;

    private String articleType;

    private String targetAudience;

    private String searchIntent;

    private Integer estimatedWordCount;

    private List<String> seoKeywords;

    private List<OutlineSection> outline;
}