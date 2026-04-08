package com.blogproject.blogproject.entities;

import com.blogproject.blogproject.enums.SoundtrackType;
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

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "soundtracks")
public class Soundtrack {

    @Id
    private String id;

    @NotBlank(message = "Soundtrack link must not be empty")
    @Indexed(unique = true)
    private String link;

    @NotBlank(message = "Type must not be empty")
    private SoundtrackType type;

    @DBRef
    private Playlist playlist;
}