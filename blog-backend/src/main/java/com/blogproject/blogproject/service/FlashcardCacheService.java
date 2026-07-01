package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.FlashcardDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FlashcardCacheService {

    private final List<FlashcardDto> generatedFlashcards =
            new ArrayList<>();

    public void addFlashcard(
            FlashcardDto flashcard
    ) {
        generatedFlashcards.add(
                flashcard
        );
    }

    public List<FlashcardDto> getAll() {
        return generatedFlashcards;
    }

    public void clear() {
        generatedFlashcards.clear();
    }
}