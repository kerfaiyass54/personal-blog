package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.ActivityType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

@Document(collection = "sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "email_time_idx",
        def = "{'email': 1, 'time': -1}"
)
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
    @Size(max = 100, message = "Operating system cannot exceed 100 characters")
    private String os;

    @NotBlank(message = "Browser is required")
    @Size(max = 100, message = "Browser cannot exceed 100 characters")
    private String browser;

    private boolean me = false;

    @NotNull(message = "Activity type is required")
    private ActivityType activityType;
}