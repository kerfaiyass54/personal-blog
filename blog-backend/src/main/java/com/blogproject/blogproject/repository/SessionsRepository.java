package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.enums.ActivityType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface SessionsRepository extends MongoRepository<Session, String> {

    List<Session> findSessionsByEmail(String email);

    List<Session> findSessionsByEmailAndAlert(String email, ActivityType alert);

    Session findSessionByTime(Instant time);

}
