package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends MongoRepository<Skill, String> {

    Optional<Skill> findByNameIgnoreCase(String name);

    List<Skill> findByFieldIgnoreCase(String field);

    boolean existsByNameIgnoreCase(String name);
}