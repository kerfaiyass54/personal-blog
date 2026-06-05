package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SkillRepository extends MongoRepository<Skill,String> {
}
