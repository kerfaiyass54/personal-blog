package com.blogproject.blogproject.dtos;

import com.blogproject.blogproject.enums.SoundtrackType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SoundtrackDetailsDTO {

    private String id;

    private String link;

    private String title;

    private SoundtrackType type;

    private Instant lastTimePlayed;

    private Integer rate;

    private Integer timesPlayed;

    private String playlistId;

    private String playlistTitle;

}