package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.CreateLessonReadingRequest;
import com.blogproject.blogproject.dtos.LessonReadingResponse;
import com.blogproject.blogproject.dtos.UpdateProgressRequest;
import com.blogproject.blogproject.entities.LessonReading;
import com.blogproject.blogproject.repository.LessonReadingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonReadingService {

    private final LessonReadingRepository lessonReadingRepository;

    public LessonReadingResponse createReading(
            CreateLessonReadingRequest request) {

        LessonReading reading = new LessonReading();

        reading.setLessonId(request.getLessonId());
        reading.setEmailUser(request.getEmailUser());
        reading.setProgress(0);
        reading.setRead(false);
        reading.setDateLastRead(new Date());

        LessonReading saved =
                lessonReadingRepository.save(reading);

        return mapToResponse(saved);
    }

    public LessonReadingResponse updateProgress(
            String lessonId,
            String emailUser,
            UpdateProgressRequest request) {

        LessonReading reading =
                lessonReadingRepository
                        .findByLessonIdAndEmailUser(
                                lessonId,
                                emailUser
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Reading not found"));

        reading.setProgress(request.getProgress());
        reading.setDateLastRead(new Date());

        if (request.getProgress() >= 100) {
            reading.setRead(true);
        }

        LessonReading updated =
                lessonReadingRepository.save(reading);

        return mapToResponse(updated);
    }

    public List<LessonReadingResponse> getReadingsByUser(
            String emailUser) {

        return lessonReadingRepository
                .findByEmailUser(emailUser)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<LessonReadingResponse> getCompletedLessons(
            String emailUser) {

        return lessonReadingRepository
                .findByEmailUserAndReadTrue(emailUser)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private LessonReadingResponse mapToResponse(
            LessonReading reading) {

        return new LessonReadingResponse(
                reading.getId(),
                reading.getLessonId(),
                reading.getEmailUser(),
                reading.getDateLastRead(),
                reading.getProgress(),
                reading.getRead()
        );
    }
}