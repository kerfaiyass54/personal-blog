package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.PlanSummaryDto;
import com.blogproject.blogproject.entities.Plan;
import com.blogproject.blogproject.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @PostMapping
    public ResponseEntity<Plan> savePlan(
            @RequestBody Plan plan
    ) {

        Plan savedPlan = planService.savePlan(plan);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedPlan);
    }

    @GetMapping
    public ResponseEntity<List<PlanSummaryDto>> getAllPlans() {

        List<PlanSummaryDto> plans =
                planService.getAllPlans();

        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlan(
            @PathVariable String id
    ) {

        Plan plan =
                planService.getPlanById(id);

        if (plan == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(plan);
    }
}