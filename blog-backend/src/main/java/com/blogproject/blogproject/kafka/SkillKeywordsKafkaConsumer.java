package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.SkillKeywordsDTO;
import com.blogproject.blogproject.service.KeywordService;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillKeywordsKafkaConsumer {

    private final KeywordService keywordService;

    private final ObjectMapper objectMapper;

    @KafkaListener(
            topics = "keywords-topic",
            groupId = "skill-keyword-group"
    )
    public void consume(
            String message
    ) {

        try {

            SkillKeywordsDTO result =
                    objectMapper.readValue(
                            message,
                            SkillKeywordsDTO.class
                    );

            result.getKeywords()
                    .forEach(keyword ->
                            keywordService.save(
                                    keyword,
                                    result.getSkill()
                            )
                    );

            System.out.println(
                    "Keywords saved for skill: "
                            + result.getSkill()
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}