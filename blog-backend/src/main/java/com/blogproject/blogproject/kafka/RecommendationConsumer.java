package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.entities.Recommendation;

import com.blogproject.blogproject.repository.
        RecommendationRepository;

import org.springframework.kafka.annotation.KafkaListener;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;

@Service
public class RecommendationConsumer {

    private final RecommendationRepository repository;

    public RecommendationConsumer(
            RecommendationRepository repository
    ) {

        this.repository = repository;
    }

    @KafkaListener(
            topics = "recommendation_results",
            groupId = "spring-group"
    )
    public void consume(Map<String, Object> payload) {

        String userId =
                (String) payload.get("userId");

        List<Map<String, Object>> recommendations =
                (List<Map<String, Object>>)
                        payload.get("recommendations");

        for (Map<String, Object> rec : recommendations) {

            Recommendation recommendation =
                    new Recommendation();

            recommendation.setEmail(userId);

            recommendation.setTitle(
                    (String) rec.get("title")
            );

            recommendation.setAuthor(
                    (String) rec.get("author")
            );

            recommendation.setLink(
                    (String) rec.get("link")
            );

            recommendation.setPlatform(
                    (String) rec.get("type")
            );

            recommendation.setScore(
                    Double.valueOf(
                            rec.get("score").toString()
                    )
            );

            recommendation.setSourceUser(
                    (String) rec.get("source_user")
            );



            repository.save(recommendation);
        }

        System.out.println(
                "Recommendations saved to Elasticsearch"
        );
    }
}