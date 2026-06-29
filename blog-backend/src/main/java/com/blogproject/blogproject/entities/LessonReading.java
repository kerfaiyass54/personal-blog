package com.blogproject.blogproject.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "lesson_readings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonReading {

    @Id
    private String id;

    private String lessonId;

    private String emailUser;

    private Date dateLastRead;

    private Integer progress; // 0-100

    private Boolean read = false;
}