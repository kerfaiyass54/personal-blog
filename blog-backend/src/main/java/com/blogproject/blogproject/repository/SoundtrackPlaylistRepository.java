package com.blogproject.blogproject.repository;


import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.SoundtrackPlaylist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoundtrackPlaylistRepository extends MongoRepository<SoundtrackPlaylist,String> {

    Page<SoundtrackPlaylist> findSoundtrackPlaylistsByPlaylist(Playlist playlist, Pageable pageable);

    SoundtrackPlaylist findSoundtrackPlaylistByPlaylistAndSoundtrack(Playlist playlist, Soundtrack soundtrack);


}
