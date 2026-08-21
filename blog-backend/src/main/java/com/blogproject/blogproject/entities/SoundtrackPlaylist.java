package com.blogproject.blogproject.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "playlist_soundtracks")
@CompoundIndex(
        name = "playlist_soundtrack_unique",
        def = "{'playlistId': 1, 'soundtrackId': 1}",
        unique = true
)
public class SoundtrackPlaylist {

    @Id
    private String id;

    @NotBlank(message = "Playlist ID is required")
    @Indexed
    private String playlistId;

    @NotBlank(message = "Soundtrack ID is required")
    @Indexed
    private String soundtrackId;
}