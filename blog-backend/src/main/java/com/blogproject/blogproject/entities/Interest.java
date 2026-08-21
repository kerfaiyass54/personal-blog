package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.InterestType;
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

import java.util.List;

@Document(collection = "interests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interest {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be empty")
    @Size(
            min = 2,
            max = 50,
            message = "Name must be between 2 and 50 characters"
    )
    @Indexed(unique = true)
    private String name;

    @NotNull(message = "Interest type is required")
    private InterestType interestType;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    private List<String> profileIds;
}