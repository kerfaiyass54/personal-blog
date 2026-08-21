package com.blogproject.blogproject.repository;


import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.SoundtrackPlaylist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SoundtrackPlaylistRepository extends MongoRepository<SoundtrackPlaylist,String> {
    Page<SoundtrackPlaylist> findByPlaylistId(
            String playlistId,
            Pageable pageable
    );

    Optional<SoundtrackPlaylist> findByPlaylistIdAndSoundtrackId(
            String playlistId,
            String soundtrackId
    );

    boolean existsByPlaylistIdAndSoundtrackId(
            String playlistId,
            String soundtrackId
    );

    long countByPlaylistIdIn(
            List<String> playlistIds
    );

    long countByPlaylistId(
            String playlistId
    );

    void deleteByPlaylistId(
            String playlistId
    );

}
