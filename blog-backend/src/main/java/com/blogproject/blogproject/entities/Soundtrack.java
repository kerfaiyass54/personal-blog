package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.SoundtrackType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "soundtracks")
public class Soundtrack {

    @Id
    private String id;

    @NotBlank(message = "Soundtrack title must not be empty")
    @Indexed
    private String title;

    @NotBlank(message = "Soundtrack link must not be empty")
    private String link;

    @NotBlank(message = "Soundtrack author must not be empty")
    private String author;

    @NotNull(message = "Soundtrack type must not be null")
    private SoundtrackType type;

    @Min(value = 0, message = "Rate must be positive")
    private Integer rate = 0;

    @Indexed
    @NotBlank(message = "User ID is required")
    private String userId;
}