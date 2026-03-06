package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.ActivityType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Session {

    @Id
    private String id;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email format")
    @Indexed
    private String email;

    @NotNull(message = "Session time is required")
    @Indexed
    private Instant time;

    @NotBlank(message = "Operating system is required")
    private String os;

    @NotBlank(message = "Browser is required")
    private String browser;

    private boolean rememberMe = false;

    @NotNull(message = "Activity type is required")
    private ActivityType alert;
}