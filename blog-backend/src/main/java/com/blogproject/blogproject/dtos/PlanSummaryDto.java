package com.blogproject.blogproject.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlanSummaryDto {

    private String id;

    private String title;

    private String articleType;

    private Integer estimatedWordCount;

    private Integer sectionsCount;
}