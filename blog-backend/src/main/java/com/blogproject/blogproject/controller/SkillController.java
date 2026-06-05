package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SkillCreateDTO;
import com.blogproject.blogproject.dtos.SkillDTO;
import com.blogproject.blogproject.dtos.SkillStatisticsDTO;
import com.blogproject.blogproject.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    /**
     * PB-53: Add a new skill
     */
    @PostMapping
    public ResponseEntity<SkillDTO> createSkill(
            @Valid @RequestBody SkillCreateDTO skillCreateDTO) {

        SkillDTO createdSkill = skillService.createSkill(skillCreateDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdSkill);
    }

    /**
     * Get all skills
     */
    @GetMapping
    public ResponseEntity<List<SkillDTO>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    /**
     * Get skill by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<SkillDTO> getSkillById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }

    /**
     * PB-58: Check skills by field
     */
    @GetMapping("/field/{field}")
    public ResponseEntity<List<SkillDTO>> getSkillsByField(
            @PathVariable String field) {

        return ResponseEntity.ok(
                skillService.getSkillsByField(field)
        );
    }

    /**
     * PB-54: Check if a skill exists
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> skillExists(
            @RequestParam String name) {

        return ResponseEntity.ok(
                skillService.skillExists(name)
        );
    }

    /**
     * PB-63: Get skill statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<SkillStatisticsDTO> getStatistics() {

        return ResponseEntity.ok(
                skillService.getStatistics()
        );
    }
}