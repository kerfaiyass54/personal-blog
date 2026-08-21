package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PlaylistRepository extends MongoRepository<Playlist,String> {

    List<Playlist> findByUserId(String userId);

    long countByUserId(String userId);

    @Query(value = "{ 'userId': ?0 }", fields = "{ '_id': 1 }")
    List<String> findIdsByUserId(String userId);}
