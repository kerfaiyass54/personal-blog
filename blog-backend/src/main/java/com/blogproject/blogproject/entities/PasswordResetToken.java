package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
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

@Document(collection = "resets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "email_code_idx",
        def = "{'email': 1, 'code': 1}"
)
public class PasswordResetToken {

    @Id
    private String id;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email format is invalid")
    @Indexed
    private String email;

    @NotBlank(message = "Reset code cannot be empty")
    @Size(min = 6, max = 6, message = "Reset code must be 6 characters")
    private String code;

    @NotNull(message = "Expiration date is required")
    @Future(message = "Expiration must be in the future")
    @Indexed(name = "reset_token_ttl", expireAfter = "0s")
    private Instant expiration;

    private boolean used = false;
}