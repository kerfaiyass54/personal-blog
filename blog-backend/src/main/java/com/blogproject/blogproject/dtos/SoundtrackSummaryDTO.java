package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SoundtrackSummaryDTO {

    private String id;

    private String title;

    private String link;

    private Integer rate;

    private Integer timesPlayed;

}