package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistDetailsDTO {

    private String id;

    private String title;

    private String description;

    private Integer rate;

}