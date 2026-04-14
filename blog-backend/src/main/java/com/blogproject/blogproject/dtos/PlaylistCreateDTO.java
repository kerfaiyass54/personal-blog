package com.blogproject.blogproject.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistCreateDTO {

    @NotBlank(message = "Playlist title must not be empty")
    private String title;

    private String description;

    private List<String> soundtrackIds;

}