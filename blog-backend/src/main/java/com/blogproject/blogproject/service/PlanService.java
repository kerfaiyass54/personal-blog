package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.PlanSummaryDto;
import com.blogproject.blogproject.entities.Plan;
import com.blogproject.blogproject.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public Plan savePlan(Plan plan) {

        return planRepository.save(plan);
    }

    public List<PlanSummaryDto> getAllPlans() {

        return planRepository.findAll()
                .stream()
                .map(plan -> PlanSummaryDto.builder()
                        .id(plan.getId())
                        .title(plan.getTitle())
                        .articleType(plan.getArticleType())
                        .estimatedWordCount(plan.getEstimatedWordCount())
                        .sectionsCount(
                                plan.getOutline() == null
                                        ? 0
                                        : plan.getOutline().size()
                        )
                        .build())
                .toList();
    }

    public Plan getPlanById(String id) {

        return planRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Plan not found"));
    }
}