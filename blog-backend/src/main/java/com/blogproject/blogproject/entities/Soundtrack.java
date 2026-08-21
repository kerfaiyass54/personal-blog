package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.SoundtrackType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "soundtracks")
@CompoundIndex(
        name = "user_title_unique",
        def = "{'userId': 1, 'title': 1}",
        unique = true
)
public class Soundtrack {

    @Id
    private String id;

    @NotBlank(message = "Soundtrack title must not be empty")
    @Size(max = 200, message = "Soundtrack title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Soundtrack link must not be empty")
    @Size(max = 500, message = "Soundtrack link cannot exceed 500 characters")
    private String link;

    @NotBlank(message = "Soundtrack author must not be empty")
    @Size(max = 150, message = "Soundtrack author cannot exceed 150 characters")
    private String author;

    @NotNull(message = "Soundtrack type must not be null")
    private SoundtrackType type;

    @Min(value = 0, message = "Rate cannot be negative")
    @Max(value = 5, message = "Rate cannot exceed 5")
    private Integer rate = 0;

    private List<String> playlistIds;

    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;
}