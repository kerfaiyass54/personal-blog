package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SessionsRepository extends MongoRepository<Session, String> {

    List<Session> findSessionsByEmail(String email);
}
