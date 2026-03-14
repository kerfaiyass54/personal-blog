package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Interest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface InterestRepository extends MongoRepository<Interest,String> {

    Optional<Interest> findByName(String name);
}
