package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Playlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlaylistRepository extends MongoRepository<Playlist,String> {
}
