package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Keyword;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.List;

public interface KeywordRepository
        extends MongoRepository<Keyword, String> {

    Optional<Keyword>
    findByNameIgnoreCaseAndSkillNameIgnoreCase(
            String name,
            String skillName
    );

    List<Keyword>
    findBySkillNameIgnoreCase(
            String skillName
    );
}