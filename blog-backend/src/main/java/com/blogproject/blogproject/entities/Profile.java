package com.blogproject.blogproject.entities;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.Instant;
import java.util.List;


@Document(collection = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    private String id;

    @NotBlank(message = "First name cannot be empty")
    @NotNull
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @NotNull
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Job cannot be empty")
    @NotNull
    @Size(min = 10, max = 50, message = "Job must be between 2 and 50 characters")
    private String job;

    @NotBlank(message = "Date of birth cannot be empty")
    @NotNull
    @Size(min = 10, max = 50, message = "Date of birth must be between 2 and 50 characters")
    private Instant birthDate;

    @NotBlank(message = "Nationality cannot be empty")
    @NotNull
    @Size(min = 10, max = 50, message = "Nationality must be between 10 and 50 characters")
    private String nationality;

    @NotBlank(message = "City cannot be empty")
    @NotNull
    @Size(min = 10, max = 50, message = "City must be between 10 and 50 characters")
    private String city;

    @DBRef
    private List<Interest> interests;

    @DBRef
    @Indexed(unique = true)
    private User user;



}
