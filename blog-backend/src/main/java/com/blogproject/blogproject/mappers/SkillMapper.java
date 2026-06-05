package com.blogproject.blogproject.mappers;

import com.blogproject.blogproject.dtos.SkillCreateDTO;
import com.blogproject.blogproject.dtos.SkillDTO;
import com.blogproject.blogproject.entities.Skill;

public class SkillMapper {

    private SkillMapper() {}

    public static SkillDTO toDTO(Skill skill) {
        return new SkillDTO(
                skill.getId(),
                skill.getName(),
                skill.getField()
        );
    }

    public static Skill toEntity(SkillCreateDTO dto) {
        Skill skill = new Skill();
        skill.setName(dto.getName());
        skill.setField(dto.getField());
        return skill;
    }
}