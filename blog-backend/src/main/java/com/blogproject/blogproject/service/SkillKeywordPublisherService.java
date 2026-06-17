package com.blogproject.blogproject.service;


import com.blogproject.blogproject.kafka.SkillKeywordProducer;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SkillKeywordPublisherService {


    private final SkillKeywordProducer skillProducer;


    public void publishSkill(
            String skillName
    ) {

        skillProducer.send(skillName);
    }
}