package com.blogproject.blogproject.dtos;

import com.blogproject.blogproject.enums.SoundtrackType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SoundtrackCreateDTO {

    @NotBlank(message = "Soundtrack link must not be empty")
    private String link;

    @NotNull(message = "Soundtrack type must not be null")
    private SoundtrackType type;

    private String playlistId;

    private String title;

}