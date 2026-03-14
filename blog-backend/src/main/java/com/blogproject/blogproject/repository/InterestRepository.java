package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Interest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InterestRepository extends MongoRepository<Interest,String> {
}
