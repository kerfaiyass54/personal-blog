package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlaylistRepository extends MongoRepository<Playlist,String> {

    List<Playlist> findByUser(User user);
}
