package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    private String id;

    @NotBlank(message = "First name cannot be empty")
    @Size(min = 2, max = 50,
            message = "First name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Size(min = 2, max = 50,
            message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Job cannot be empty")
    @Size(min = 2, max = 100,
            message = "Job must be between 2 and 100 characters")
    private String job;

    @NotNull(message = "Date of birth is required")
    private Instant birthDate;

    @NotBlank(message = "Nationality cannot be empty")
    @Size(min = 2, max = 50,
            message = "Nationality must be between 2 and 50 characters")
    private String nationality;

    @NotBlank(message = "City cannot be empty")
    @Size(min = 2, max = 100,
            message = "City must be between 2 and 100 characters")
    private String city;

    private List<String> interestIds;

    @NotBlank(message = "User ID is required")
    @Indexed(unique = true)
    private String userId;
}