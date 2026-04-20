package com.blogproject.blogproject.entities;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "playlists")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Playlist {

    @Id
    private String id;

    @NotBlank(message = "Playlist title must not be empty")
    @Indexed(unique = true)
    private String title;

    private String description;

    @Min(value = 0, message = "Rate must be positive")
    private Integer rate = 0;

    @DBRef
    private List<SoundtrackPlaylist>  soundtracks;

}
