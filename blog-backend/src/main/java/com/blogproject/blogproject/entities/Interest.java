package com.blogproject.blogproject.entities;


import com.blogproject.blogproject.enums.InterestType;
import com.blogproject.blogproject.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;


@Document(collection = "interests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interest {

    @Id
    private String id;


    @NotBlank(message = "Name cannot be empty")
    @NotNull
    @Indexed(unique = true)
    @Size(min = 10, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Interest cannot be empty")
    @Enumerated(EnumType.STRING)
    private InterestType  interestType;

    private String description;

    @DBRef
    private List<Profile> profiles;
}
