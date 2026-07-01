package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.FlashcardDto;
import com.blogproject.blogproject.service.FlashcardCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FlashcardConsumer {

    private final FlashcardCacheService cacheService;

    @KafkaListener(
            topics = "flashcards-topic",
            groupId = "blog-group",
            containerFactory = "flashcardKafkaListenerFactory"
    )
    public void consume(
            FlashcardDto flashcard
    ) {

        System.out.println(
                "FLASHCARD RECEIVED => "
                        + flashcard.getTerm()
        );

        cacheService.addFlashcard(
                flashcard
        );

        System.out.println(
                "Received flashcard: "
                        + flashcard.getTerm()
        );
    }
}