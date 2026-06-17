package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.service.SkillKeywordPublisherService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skill-keywords")
@RequiredArgsConstructor
public class SkillKeywordController {

    private final SkillKeywordPublisherService
            publisherService;

    @PostMapping("/publish/{skill}")
    public String publishSkills(@PathVariable String skill) {

        publisherService.publishSkill(skill);

        return "Skills published successfully";
    }
}