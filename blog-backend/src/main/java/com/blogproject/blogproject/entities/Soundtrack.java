package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.SoundtrackType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

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
    @Indexed(unique = true)
    private String title;

    @NotBlank(message = "Soundtrack link must not be empty")
    @Indexed(unique = true)
    private String link;

    @NotNull(message = "Soundtrack type must not be null")
    private SoundtrackType type;

    @Min(value = 0, message = "Rate must be positive")
    private Integer rate = 0;

    @DBRef
    private List<SoundtrackPlaylist> playlists;

    @DBRef
    private User user;
}