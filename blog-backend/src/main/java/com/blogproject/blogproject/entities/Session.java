package com.blogproject.blogproject.entities;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "sessions")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Session {

    @Id
    private String id;
    private String email;
    private Instant time;
    private String os;
    private String browser;
    private boolean isMe;
    private boolean active;
}
