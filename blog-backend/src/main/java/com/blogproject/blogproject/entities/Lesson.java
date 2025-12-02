package com.blogproject.blogproject.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "lessons")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Lesson {

    @Id
    private String id;
    private String title;
    private String content;
    private Date dateInsert;
}
