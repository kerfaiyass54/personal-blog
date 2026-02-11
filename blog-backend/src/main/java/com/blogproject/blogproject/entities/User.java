package com.blogproject.blogproject.entities;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private String role;
    private Instant passwordChangedAt;
}
