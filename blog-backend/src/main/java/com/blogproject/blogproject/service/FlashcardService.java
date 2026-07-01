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

        return cacheService.getAll();
    }

    public void saveGeneratedFlashcards() {

        List<FlashcardDto> generated =
                cacheService.getAll();

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

        cacheService.clear();
    }

    public List<Flashcard> getLessonFlashcards(
            String lessonId
    ) {

        return repository.findByLessonId(
                lessonId
        );
    }
}