package com.blogproject.blogproject.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "explains")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Explain {

    @Id
    private String id;

    private String content;

    @CreatedDate
    private Instant insertDate;
}