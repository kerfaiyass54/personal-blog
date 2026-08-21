package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "lesson_readings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "lesson_user_unique",
        def = "{'lessonId': 1, 'emailUser': 1}",
        unique = true
)
public class LessonReading {

    @Id
    private String id;

    @NotBlank(message = "Lesson ID is required")
    @Indexed
    private String lessonId;

    @NotBlank(message = "User email is required")
    @Email(message = "Invalid user email")
    @Indexed
    private String emailUser;

    private Instant dateLastRead;

    @NotNull(message = "Progress is required")
    @Min(value = 0, message = "Progress cannot be less than 0")
    @Max(value = 100, message = "Progress cannot exceed 100")
    private Integer progress;

    @NotNull(message = "Read status is required")
    private Boolean read = false;
}