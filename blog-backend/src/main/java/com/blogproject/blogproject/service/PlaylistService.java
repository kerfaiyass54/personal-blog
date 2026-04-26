package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.PlaylistCreateDTO;
import com.blogproject.blogproject.dtos.PlaylistDetailsDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.*;
import com.blogproject.blogproject.repository.*;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PlaylistService {

    private final PlaylistRepository playlistRepository;

    private final SoundtrackPlaylistRepository soundtrackPlaylistRepository;

    private final SoundtrackRepository soundtrackRepository;

    private final UserRepository userRepository;


    public PlaylistService(
            PlaylistRepository playlistRepository,
            SoundtrackPlaylistRepository soundtrackPlaylistRepository,
            SoundtrackRepository soundtrackRepository,
            UserRepository userRepository
    ) {

        this.playlistRepository = playlistRepository;
        this.soundtrackPlaylistRepository = soundtrackPlaylistRepository;
        this.soundtrackRepository = soundtrackRepository;
        this.userRepository = userRepository;
    }


    public PlaylistDetailsDTO mapPlaylist(Playlist playlist) {

        PlaylistDetailsDTO dto = new PlaylistDetailsDTO();

        dto.setId(playlist.getId());
        dto.setTitle(playlist.getTitle());
        dto.setDescription(playlist.getDescription());
        dto.setRate(playlist.getRate());

        return dto;
    }


    public Integer getPlaylistsCount(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return playlistRepository.findByUser(user).size();
    }


    public Integer getInsertedTracksNumber(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return playlistRepository.findByUser(user)
                .stream()
                .mapToInt(p -> p.getSoundtracks().size())
                .sum();
    }


    public List<PlaylistDetailsDTO> getPlaylists(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return playlistRepository
                .findByUser(user)
                .stream()
                .map(this::mapPlaylist)
                .toList();
    }


    public Page<SoundtrackDetailsDTO> getSoundTracksForPlaylist(
            String email,
            String playlistId,
            int page,
            int size
    ) {

        Playlist playlist =
                playlistRepository.findById(playlistId)
                        .orElseThrow(() ->
                                new RuntimeException("Playlist not found"));

        if (!playlist.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Unauthorized access");
        }

        Page<SoundtrackPlaylist> soundtrackPlaylists =
                soundtrackPlaylistRepository
                        .findSoundtrackPlaylistsByPlaylist(
                                playlist,
                                PageRequest.of(page, size)
                        );

        return soundtrackPlaylists.map(sp -> {

            Soundtrack s = sp.getSoundtrack();

            SoundtrackDetailsDTO dto =
                    new SoundtrackDetailsDTO();

            dto.setId(s.getId());
            dto.setLink(s.getLink());
            dto.setTitle(s.getTitle());
            dto.setType(s.getType());
            dto.setRate(s.getRate());

            return dto;
        });
    }


    public void removeSoundtrack(
            String email,
            String soundtrackId,
            String playlistId
    ) {

        Playlist playlist =
                playlistRepository.findById(playlistId)
                        .orElseThrow(() ->
                                new RuntimeException("Playlist not found"));

        if (!playlist.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Unauthorized access");
        }

        Soundtrack soundtrack =
                soundtrackRepository.findById(soundtrackId)
                        .orElseThrow(() ->
                                new RuntimeException("Soundtrack not found"));

        soundtrackPlaylistRepository.delete(
                soundtrackPlaylistRepository
                        .findSoundtrackPlaylistByPlaylistAndSoundtrack(
                                playlist,
                                soundtrack
                        )
        );
    }


    public SoundtrackPlaylist addSoundtrackToPlaylist(
            String email,
            String soundtrackId,
            String playlistId
    ) {

        Playlist playlist =
                playlistRepository.findById(playlistId)
                        .orElseThrow(() ->
                                new RuntimeException("Playlist not found"));

        if (!playlist.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Unauthorized access");
        }

        Soundtrack soundtrack =
                soundtrackRepository.findById(soundtrackId)
                        .orElseThrow(() ->
                                new RuntimeException("Soundtrack not found"));

        SoundtrackPlaylist sp =
                new SoundtrackPlaylist();

        sp.setPlaylist(playlist);

        sp.setSoundtrack(soundtrack);

        return soundtrackPlaylistRepository.save(sp);
    }


    public void deletePlaylist(
            String email,
            String playlistId
    ) {

        Playlist playlist =
                playlistRepository.findById(playlistId)
                        .orElseThrow(() ->
                                new RuntimeException("Playlist not found"));

        if (!playlist.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Unauthorized access");
        }

        playlistRepository.delete(playlist);
    }


    public Playlist createPlaylist(
            String email,
            PlaylistCreateDTO dto
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        Playlist playlist =
                new Playlist();

        playlist.setTitle(dto.getTitle());

        playlist.setDescription(dto.getDescription());

        playlist.setUser(user);

        Playlist saved =
                playlistRepository.save(playlist);

        for (String soundtrackId : dto.getSoundtrackIds()) {

            addSoundtrackToPlaylist(
                    email,
                    soundtrackId,
                    saved.getId()
            );
        }

        return saved;
    }

}