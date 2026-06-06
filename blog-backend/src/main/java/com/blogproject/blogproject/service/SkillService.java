package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SkillCreateDTO;
import com.blogproject.blogproject.dtos.SkillDTO;
import com.blogproject.blogproject.dtos.SkillFieldStatsDTO;
import com.blogproject.blogproject.dtos.SkillStatisticsDTO;
import com.blogproject.blogproject.entities.Skill;
import com.blogproject.blogproject.exceptions.SkillAlreadyExistsException;
import com.blogproject.blogproject.exceptions.SkillNotFoundException;
import com.blogproject.blogproject.kafka.SkillProducer;
import com.blogproject.blogproject.mappers.SkillMapper;
import com.blogproject.blogproject.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final SkillProducer skillProducer;


    public SkillDTO createSkill(SkillCreateDTO dto) {

        Skill skill =
                skillRepository.save(
                        SkillMapper.toEntity(dto)
                );

        SkillDTO response =
                SkillMapper.toDTO(skill);

        skillProducer.publishSkillCreated(
                response
        );

        return response;
    }

    
    public SkillDTO getSkillById(String id) {

        Skill skill = skillRepository.findById(id)
                .orElseThrow(() ->
                        new SkillNotFoundException(
                                "Skill not found with id: " + id
                        ));

        return SkillMapper.toDTO(skill);
    }

    
    public List<SkillDTO> getAllSkills() {

        return skillRepository.findAll()
                .stream()
                .map(SkillMapper::toDTO)
                .toList();
    }

    
    public List<SkillDTO> getSkillsByField(String field) {

        return skillRepository.findByFieldIgnoreCase(field)
                .stream()
                .map(SkillMapper::toDTO)
                .toList();
    }

    
    public boolean skillExists(String name) {

        return skillRepository.existsByNameIgnoreCase(name);
    }


    public SkillStatisticsDTO getStatistics() {

        List<Skill> skills = skillRepository.findAll();

        long totalSkills = skills.size();

        List<SkillFieldStatsDTO> statsByField = skills.stream()
                .collect(Collectors.groupingBy(
                        Skill::getField,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(entry -> new SkillFieldStatsDTO(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();

        return new SkillStatisticsDTO(
                totalSkills,
                statsByField
        );
    }


}