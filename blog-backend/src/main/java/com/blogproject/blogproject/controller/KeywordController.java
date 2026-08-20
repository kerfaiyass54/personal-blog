package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SkillKeywordsDTO;
import com.blogproject.blogproject.service.KeywordService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/keywords")
@RequiredArgsConstructor
@CrossOrigin("*")
public class KeywordController {

    private final KeywordService keywordService;

    @GetMapping("/{skill}")
    public SkillKeywordsDTO getSkillKeywords(
            @PathVariable String skill
    ) {

        return keywordService.exportSkillKeywords(
                skill
        );
    }
}