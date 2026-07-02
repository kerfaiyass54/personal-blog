package com.blogproject.blogproject.kafka;

import com.blogproject.blogproject.dtos.QuizGeneratedDTO;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuizConsumer {

    private final List<QuizGeneratedDTO>
            generatedQuizzes =
            new ArrayList<>();

    @KafkaListener(
            topics = "quiz-generated",
            containerFactory =
                    "quizKafkaListenerFactory"
    )
    public void consume(
            QuizGeneratedDTO dto
    ) {

        generatedQuizzes.add(dto);

        System.out.println(
                "QUIZ RECEIVED -> "
                        + dto.getLessonTitle()
        );
    }

    public List<QuizGeneratedDTO>
    getGeneratedQuizzes() {

        return generatedQuizzes;
    }

    public void clear() {

        generatedQuizzes.clear();
    }
}