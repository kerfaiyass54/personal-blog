package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.PlaylistDetailsDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.SoundtrackPlaylist;
import com.blogproject.blogproject.repository.PlaylistRepository;
import com.blogproject.blogproject.repository.SoundtrackPlaylistRepository;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class PlaylistService {

    private final PlaylistRepository playlistRepository;

    private final SoundtrackPlaylistRepository soundtrackPlaylistRepository;

    private final SoundtrackRepository soundtrackRepository;

    public PlaylistService(PlaylistRepository playlistRepository,  SoundtrackPlaylistRepository soundtrackPlaylistRepository,   SoundtrackRepository soundtrackRepository) {
        this.playlistRepository = playlistRepository;
        this.soundtrackPlaylistRepository = soundtrackPlaylistRepository;
        this.soundtrackRepository = soundtrackRepository;
    }

    public PlaylistDetailsDTO getPlaylist(Playlist playlist){
        PlaylistDetailsDTO playlistDetailsDTO = new PlaylistDetailsDTO();
        playlistDetailsDTO.setId(playlist.getId());
        playlistDetailsDTO.setTitle(playlist.getTitle());
        playlistDetailsDTO.setDescription(playlist.getDescription());
        playlistDetailsDTO.setRate(playlist.getRate());
        return playlistDetailsDTO;
    }

    public Integer getPlaylistsCount() {
        return playlistRepository.findAll().size();
    }

    public Integer getInsertedTracksNumber() {
        return playlistRepository.findAll()
                .stream()
                .mapToInt(playlist -> playlist.getSoundtracks().size())
                .sum();
    }

    public List<PlaylistDetailsDTO> getPlaylists() {
        return playlistRepository.findAll().stream().map(this::getPlaylist).toList();
    }


    public Page<SoundtrackDetailsDTO> getSoundTracksForPlaylist(String id, int page, int size) {

        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Playlist not found with id: " + id));

        Page<SoundtrackPlaylist> soundtrackPlaylists =
                soundtrackPlaylistRepository.findSoundtrackPlaylistsByPlaylist(
                        playlist,
                        PageRequest.of(page, size)
                );

        return soundtrackPlaylists.map(sp -> {
            Soundtrack soundtrack = sp.getSoundtrack();

            SoundtrackDetailsDTO dto = new SoundtrackDetailsDTO();
            dto.setId(soundtrack.getId());
            dto.setLink(soundtrack.getLink());
            dto.setTitle(soundtrack.getTitle());
            dto.setType(soundtrack.getType());
            dto.setRate(soundtrack.getRate());

            return dto;
        });
    }

    public void removeSoundtrack(String soundTrackId, String playlistId){
        Optional<Soundtrack> soundtrack = soundtrackRepository.findById(soundTrackId);
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        if(soundtrack.isPresent() && playlist.isPresent()){
            Soundtrack soundtrack1 = soundtrack.get();
            Playlist playlist1 = playlist.get();
            soundtrackPlaylistRepository.delete(soundtrackPlaylistRepository.findSoundtrackPlaylistByPlaylistAndSoundtrack(playlist1, soundtrack1));
        }
    }


    public SoundtrackPlaylist addPlaylist(String soundTrackId, String playlistId){
        Optional<Soundtrack> soundtrack = soundtrackRepository.findById(soundTrackId);
        Optional<Playlist> playlist = playlistRepository.findById(playlistId);
        if(soundtrack.isPresent() && playlist.isPresent()){
            SoundtrackPlaylist soundtrackPlaylist = new SoundtrackPlaylist();
            soundtrackPlaylist.setSoundtrack(soundtrack.get());
            soundtrackPlaylist.setPlaylist(playlist.get());
            return soundtrackPlaylistRepository.save(soundtrackPlaylist);
        }
        return null;
    }


    public void deletePlaylist(String soundTrackId){
        Optional<Soundtrack> soundtrack = soundtrackRepository.findById(soundTrackId);
        soundtrack.ifPresent(soundtrackRepository::delete);
    }







}
