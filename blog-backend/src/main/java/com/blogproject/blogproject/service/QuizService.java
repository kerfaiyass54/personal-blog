package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.*;
import com.blogproject.blogproject.entities.*;
import com.blogproject.blogproject.kafka.QuizConsumer;
import com.blogproject.blogproject.repository.QuestionRepository;
import com.blogproject.blogproject.repository.QuizRepository;
import com.blogproject.blogproject.repository.UserQuizResultRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizConsumer consumer;

    private final QuizRepository quizRepository;

    private final QuestionRepository questionRepository;

    private final UserQuizResultRepository userQuizResultRepository;

    public List<QuizGeneratedDTO> getGeneratedQuizzes() {

        return consumer.getGeneratedQuizzes();
    }

    public void saveGeneratedQuizzes() {

        for (QuizGeneratedDTO generated : consumer.getGeneratedQuizzes()) {

            Quiz quiz =
                    Quiz.builder()
                            .lessonId(
                                    generated.getLessonId()
                            )
                            .lessonTitle(
                                    generated.getLessonTitle()
                            )
                            .numberOfQuestions(
                                    generated.getNumberOfQuestions()
                            )
                            .build();

            quiz = quizRepository.save(
                    quiz
            );

            for (QuestionDTO dto : generated.getQuestions()) {

                Question question =
                        Question.builder()
                                .quizId(
                                        quiz.getId()
                                )
                                .content(
                                        dto.getContent()
                                )
                                .answer(
                                        dto.getAnswer()
                                )
                                .hint(
                                        dto.getHint()
                                )
                                .possibilities(
                                        dto.getPossibilities()
                                )
                                .build();

                questionRepository.save(
                        question
                );
            }
        }

        consumer.clear();
    }

    public List<Question> getQuizQuestions(
            String quizId
    ) {

        return questionRepository.findByQuizId(
                quizId
        );
    }

    public QuizResultDTO submitQuiz(
            SubmitQuizRequest request
    ) {

        List<Question> questions =
                questionRepository.findByQuizId(
                        request.getQuizId()
                );

        int correctAnswers = 0;

        List<UserAnswer> savedAnswers =
                new ArrayList<>();

        List<QuestionResultDTO> results =
                new ArrayList<>();

        for (Question question : questions) {

            QuestionAnswerDTO userAnswer =
                    request.getAnswers()
                            .stream()
                            .filter(
                                    a ->
                                            a.getQuestionId()
                                                    .equals(
                                                            question.getId()
                                                    )
                            )
                            .findFirst()
                            .orElse(null);

            String selectedAnswer =
                    userAnswer != null
                            ? userAnswer.getSelectedAnswer()
                            : "";

            boolean correct =
                    question.getAnswer()
                            .equals(
                                    selectedAnswer
                            );

            if (correct) {
                correctAnswers++;
            }

            savedAnswers.add(

                    UserAnswer.builder()
                            .questionId(
                                    question.getId()
                            )
                            .questionContent(
                                    question.getContent()
                            )
                            .selectedAnswer(
                                    selectedAnswer
                            )
                            .correctAnswer(
                                    question.getAnswer()
                            )
                            .correct(
                                    correct
                            )
                            .build()
            );

            results.add(

                    QuestionResultDTO.builder()
                            .question(
                                    question.getContent()
                            )
                            .selectedAnswer(
                                    selectedAnswer
                            )
                            .correctAnswer(
                                    question.getAnswer()
                            )
                            .correct(
                                    correct
                            )
                            .build()
            );
        }

        int totalQuestions =
                questions.size();

        double percentage =
                totalQuestions == 0
                        ? 0
                        : ((double) correctAnswers
                        / totalQuestions) * 100;

        Quiz quiz =
                quizRepository.findById(
                        request.getQuizId()
                ).orElseThrow();

        UserQuizResult result =
                UserQuizResult.builder()
                        .userId(
                                request.getUserId()
                        )
                        .quizId(
                                quiz.getId()
                        )
                        .lessonId(
                                quiz.getLessonId()
                        )
                        .totalQuestions(
                                totalQuestions
                        )
                        .correctAnswers(
                                correctAnswers
                        )
                        .scorePercentage(
                                percentage
                        )
                        .completedAt(
                                LocalDateTime.now()
                        )
                        .answers(
                                savedAnswers
                        )
                        .build();

        userQuizResultRepository.save(
                result
        );

        return QuizResultDTO.builder()
                .totalQuestions(
                        totalQuestions
                )
                .correctAnswers(
                        correctAnswers
                )
                .scorePercentage(
                        percentage
                )
                .questions(
                        results
                )
                .build();
    }

    public List<UserQuizResult> getUserResults(
            String userId
    ) {

        return userQuizResultRepository.findByUserId(
                userId
        );
    }
}