package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.SkillDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillProducer {

    private final KafkaTemplate<String, SkillDTO> kafkaTemplate;

    public void publishSkillCreated(
            SkillDTO dto
    ) {

        kafkaTemplate.send(
                "skill-created",
                dto.getId(),
                dto
        );
    }
}