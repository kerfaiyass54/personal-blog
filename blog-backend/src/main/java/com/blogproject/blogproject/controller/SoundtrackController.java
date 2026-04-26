package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.enums.SoundtrackType;
import com.blogproject.blogproject.service.SoundtrackService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{email}/soundtracks")
@CrossOrigin("*")
public class SoundtrackController {

    private final SoundtrackService soundtrackService;


    public SoundtrackController(
            SoundtrackService soundtrackService
    ) {

        this.soundtrackService = soundtrackService;
    }


    @GetMapping("/total")
    public ResponseEntity<Integer> total(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                soundtrackService.getTotalSoundtracks(email)
        );
    }


    @GetMapping("/rated")
    public ResponseEntity<Integer> rated(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                soundtrackService.getRatedSoundtracks(email)
        );
    }


    @GetMapping
    public ResponseEntity<List<SoundtrackDetailsDTO>> all(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                soundtrackService.getUserSoundtracks(email)
        );
    }


    @PostMapping
    public ResponseEntity<Soundtrack> create(
            @PathVariable String email,
            @RequestBody SoundtrackCreateDTO dto
    ) {

        return ResponseEntity.ok(
                soundtrackService.addSoundtrack(email, dto)
        );
    }


    @DeleteMapping("/{soundtrackId}")
    public ResponseEntity<Void> delete(
            @PathVariable String email,
            @PathVariable String soundtrackId
    ) {

        soundtrackService.removeSoundtrack(
                email,
                soundtrackId
        );

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<SoundtrackDetailsDTO>> getByType(
            @PathVariable String email,
            @RequestParam SoundtrackType type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                soundtrackService.getSoundtracksByType(
                        email,
                        type,
                        page,
                        size
                )
        );
    }

}