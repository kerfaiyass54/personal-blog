package com.blogproject.blogproject.kafka;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;

@Service
public class SkillKeywordProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private final ObjectMapper objectMapper =
            new ObjectMapper();

    private static final String TOPIC =
            "skills-topic";

    public SkillKeywordProducer(
            @Qualifier("skillKeywordKafkaTemplate")
            KafkaTemplate<String, String> kafkaTemplate
    ) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(String name) {

        try {

            String payload = objectMapper.writeValueAsString(
                    Map.of("skill", name)
            );

            kafkaTemplate.send(
                    TOPIC,
                    payload
            );

        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }
}