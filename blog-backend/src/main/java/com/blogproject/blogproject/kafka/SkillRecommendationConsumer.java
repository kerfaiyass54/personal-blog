package com.blogproject.blogproject.kafka;



import com.blogproject.blogproject.dtos.SkillRecommendationDTO;
import com.blogproject.blogproject.entities.SkillRecommendation;
import com.blogproject.blogproject.repository.SkillRecommendationRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillRecommendationConsumer {

    private final SkillRecommendationRepository repository;

    @KafkaListener(
            topics = "recommendation-generated",
            groupId = "recommendation-group",
            containerFactory =
                    "kafkaListenerContainerFactorySkill"
    )
    public void consume(
            SkillRecommendationDTO dto
    ) {

        SkillRecommendation entity =
                SkillRecommendation.builder()
                        .skillName(dto.getSkillName())
                        .field(dto.getField())
                        .recommendations(
                                dto.getRecommendations()
                        )
                        .build();

        repository.save(entity);

        System.out.println(
                "Recommendations saved for: "
                        + dto.getSkillName()
        );
    }
}