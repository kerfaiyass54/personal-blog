package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.dtos.RecommendationItem;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recommendations")
public class Recommendation {

    @Id
    private String id;

    private String userId;

    private String email;

    private String soundtrackId;

    private List<RecommendationItem> recommendations;

    private Instant createdAt;
}