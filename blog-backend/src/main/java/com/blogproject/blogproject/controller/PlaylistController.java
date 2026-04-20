package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.PlaylistDetailsDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.SoundtrackPlaylist;
import com.blogproject.blogproject.service.PlaylistService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playlists")
@CrossOrigin("*")
public class PlaylistController {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }


    // Get playlists total
    @GetMapping("/total")
    public ResponseEntity<Integer> getPlaylistsCount() {
        return ResponseEntity.ok(playlistService.getPlaylistsCount());
    }


    // Get inserted tracks total across playlists
    @GetMapping("/tracks/total")
    public ResponseEntity<Integer> getInsertedTracksNumber() {
        return ResponseEntity.ok(playlistService.getInsertedTracksNumber());
    }


    // Get all playlists
    @GetMapping
    public ResponseEntity<List<PlaylistDetailsDTO>> getPlaylists() {
        return ResponseEntity.ok(playlistService.getPlaylists());
    }


    // Get paginated soundtracks inside playlist
    @GetMapping("/{playlistId}/soundtracks")
    public ResponseEntity<Page<SoundtrackDetailsDTO>> getSoundTracksForPlaylist(
            @PathVariable String playlistId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                playlistService.getSoundTracksForPlaylist(playlistId, page, size)
        );
    }


    // Remove soundtrack from playlist
    @DeleteMapping("/{playlistId}/soundtracks/{soundtrackId}")
    public ResponseEntity<Void> removeSoundtrack(
            @PathVariable String playlistId,
            @PathVariable String soundtrackId
    ) {
        playlistService.removeSoundtrack(soundtrackId, playlistId);
        return ResponseEntity.noContent().build();
    }


    // Add soundtrack to playlist
    @PostMapping("/{playlistId}/soundtracks/{soundtrackId}")
    public ResponseEntity<SoundtrackPlaylist> addSoundtrackToPlaylist(
            @PathVariable String playlistId,
            @PathVariable String soundtrackId
    ) {

        SoundtrackPlaylist result =
                playlistService.addPlaylist(soundtrackId, playlistId);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }


    // Delete soundtrack completely
    @DeleteMapping("/soundtracks/{soundtrackId}")
    public ResponseEntity<Void> deleteSoundtrack(
            @PathVariable String soundtrackId
    ) {

        playlistService.deletePlaylist(soundtrackId);
        return ResponseEntity.noContent().build();
    }

}