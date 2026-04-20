package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.service.SoundtrackService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/soundtracks")
@CrossOrigin("*")
public class SoundtrackController {

    private final SoundtrackService soundtrackService;

    public SoundtrackController(SoundtrackService soundtrackService) {
        this.soundtrackService = soundtrackService;
    }


    // ✅ getTotalSoundtracks()
    @GetMapping("/total")
    public ResponseEntity<Integer> getTotalSoundtracks() {

        return ResponseEntity.ok(
                soundtrackService.getTotalSoundtracks()
        );
    }


    // ✅ getRatedPlaylists()
    @GetMapping("/rated")
    public ResponseEntity<Integer> getRatedPlaylists() {

        return ResponseEntity.ok(
                soundtrackService.getRatedSoundtracks()
        );
    }


    // ✅ addSoundtrack()
    @PostMapping
    public ResponseEntity<Soundtrack> addSoundtrack(

            @RequestBody SoundtrackCreateDTO dto
    ) {

        return ResponseEntity.ok(
                soundtrackService.addSoundtrack(dto)
        );
    }


    // ✅ removeSoundtrack()
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeSoundtrack(

            @PathVariable String id
    ) {

        soundtrackService.removeSoundtrack(id);

        return ResponseEntity.noContent().build();
    }

}