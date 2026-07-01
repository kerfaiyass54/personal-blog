package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.FlashcardDto;
import com.blogproject.blogproject.entities.Flashcard;
import com.blogproject.blogproject.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService service;

    @GetMapping("/generated")
    public ResponseEntity<List<FlashcardDto>> getGenerated() {

        List<FlashcardDto> flashcards =
                service.getGeneratedFlashcards();

        return ResponseEntity.ok(
                flashcards
        );
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveGenerated() {

        service.saveGeneratedFlashcards();

        return ResponseEntity.status(
                HttpStatus.CREATED
        ).body(
                "Flashcards saved successfully"
        );
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<Flashcard>> getLessonFlashcards(
            @PathVariable String lessonId
    ) {

        List<Flashcard> flashcards =
                service.getLessonFlashcards(
                        lessonId
                );

        return ResponseEntity.ok(
                flashcards
        );
    }
}