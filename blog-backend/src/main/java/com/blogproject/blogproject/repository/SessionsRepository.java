package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.enums.ActivityType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SessionsRepository extends MongoRepository<Session, String> {

    List<Session> findSessionsByEmail(String email);

    List<Session> findSessionsByEmailAndAlert(String email, ActivityType alert);
}
