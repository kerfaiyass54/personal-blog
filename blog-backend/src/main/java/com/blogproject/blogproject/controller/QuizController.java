package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.QuizGeneratedDTO;
import com.blogproject.blogproject.dtos.QuizResultDTO;
import com.blogproject.blogproject.dtos.SubmitQuizRequest;

import com.blogproject.blogproject.entities.Question;
import com.blogproject.blogproject.entities.UserQuizResult;

import com.blogproject.blogproject.service.QuizService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/generated")
    public ResponseEntity<List<QuizGeneratedDTO>>
    getGeneratedQuizzes() {

        return ResponseEntity.ok(
                quizService.getGeneratedQuizzes()
        );
    }

    @PostMapping("/save")
    public ResponseEntity<String>
    saveGeneratedQuizzes() {

        quizService.saveGeneratedQuizzes();

        return ResponseEntity.ok(
                "Quizzes saved successfully"
        );
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<Question>>
    getQuizQuestions(
            @PathVariable String quizId
    ) {

        return ResponseEntity.ok(
                quizService.getQuizQuestions(
                        quizId
                )
        );
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO>
    submitQuiz(
            @RequestBody
            SubmitQuizRequest request
    ) {

        return ResponseEntity.ok(
                quizService.submitQuiz(
                        request
                )
        );
    }

    @GetMapping("/results/{userId}")
    public ResponseEntity<List<UserQuizResult>>
    getUserResults(
            @PathVariable String userId
    ) {

        return ResponseEntity.ok(
                quizService.getUserResults(
                        userId
                )
        );
    }
}