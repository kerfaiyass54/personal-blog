package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.FlashcardDto;
import com.blogproject.blogproject.entities.Flashcard;
import com.blogproject.blogproject.repository.FlashcardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository repository;

    private final FlashcardCacheService cacheService;

    public List<FlashcardDto> getGeneratedFlashcards() {

        return cacheService.getAllFlashcards();
    }

    public void saveGeneratedFlashcards() {

        List<FlashcardDto> generated =
                cacheService.getAllFlashcards();

        List<Flashcard> flashcards =
                generated.stream()
                        .map(dto ->
                                Flashcard.builder()
                                        .lessonId(dto.getLessonId())
                                        .lessonTitle(dto.getLessonTitle())
                                        .type(dto.getType())
                                        .term(dto.getTerm())
                                        .value(dto.getValue())
                                        .build()
                        )
                        .toList();

        repository.saveAll(
                flashcards
        );

        cacheService.clearFlashcards();
    }

    public List<Flashcard> getLessonFlashcards(
            String lessonId
    ) {

        return repository.findByLessonId(
                lessonId
        );
    }

    public List<Flashcard> getAllFlashcards() {
        return repository.findAll();
    }
}