package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.*;
import com.blogproject.blogproject.entities.*;
import com.blogproject.blogproject.service.PlaylistService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{email}/playlists")
@CrossOrigin("*")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(
            PlaylistService playlistService
    ) {

        this.playlistService = playlistService;
    }


    @GetMapping("/total")
    public ResponseEntity<Integer> total(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                playlistService.getPlaylistsCount(email)
        );
    }


    @GetMapping("/tracks/total")
    public ResponseEntity<Integer> tracksTotal(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                playlistService.getInsertedTracksNumber(email)
        );
    }


    @GetMapping
    public ResponseEntity<List<PlaylistDetailsDTO>> all(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                playlistService.getPlaylists(email)
        );
    }


    @PostMapping
    public ResponseEntity<Playlist> create(
            @PathVariable String email,
            @RequestBody PlaylistCreateDTO dto
    ) {

        return ResponseEntity.ok(
                playlistService.createPlaylist(email, dto)
        );
    }


    @DeleteMapping("/{playlistId}")
    public ResponseEntity<Void> delete(
            @PathVariable String email,
            @PathVariable String playlistId
    ) {

        playlistService.deletePlaylist(
                email,
                playlistId
        );

        return ResponseEntity.noContent().build();
    }


    @GetMapping("/{playlistId}/soundtracks")
    public ResponseEntity<Page<SoundtrackDetailsDTO>> soundtracks(
            @PathVariable String email,
            @PathVariable String playlistId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return ResponseEntity.ok(
                playlistService.getSoundTracksForPlaylist(
                        email,
                        playlistId,
                        page,
                        size
                )
        );
    }


    @PostMapping("/{playlistId}/soundtracks/{soundtrackId}")
    public ResponseEntity<?> addTrack(
            @PathVariable String email,
            @PathVariable String playlistId,
            @PathVariable String soundtrackId
    ) {

        return ResponseEntity.ok(
                playlistService.addSoundtrackToPlaylist(
                        email,
                        soundtrackId,
                        playlistId
                )
        );
    }


    @DeleteMapping("/{playlistId}/soundtracks/{soundtrackId}")
    public ResponseEntity<?> removeTrack(
            @PathVariable String email,
            @PathVariable String playlistId,
            @PathVariable String soundtrackId
    ) {

        playlistService.removeSoundtrack(
                email,
                soundtrackId,
                playlistId
        );

        return ResponseEntity.noContent().build();
    }

}