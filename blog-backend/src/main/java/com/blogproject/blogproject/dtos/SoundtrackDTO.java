package com.blogproject.blogproject.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SoundtrackDTO {

    private String id;
    private String title;
    private String link;
    private String type;
}