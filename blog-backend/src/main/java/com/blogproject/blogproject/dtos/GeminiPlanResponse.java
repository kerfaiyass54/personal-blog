package com.blogproject.blogproject.dtos;

import lombok.Data;

import java.util.List;

@Data
public class GeminiPlanResponse {

    private String article_type;

    private String target_audience;

    private String search_intent;

    private Integer estimated_word_count;

    private List<String> seo_keywords;

    private List<OutlineSectionDto> outline;
}