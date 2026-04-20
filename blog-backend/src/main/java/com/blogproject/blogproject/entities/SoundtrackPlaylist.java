package com.blogproject.blogproject.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "soundtracks")
public class SoundtrackPlaylist {

    @Id
    private String id;

    @DBRef
    private Playlist playlist;

    @DBRef
    private Soundtrack soundtrack;

}
