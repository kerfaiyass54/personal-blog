package com.blogproject.blogproject.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SoundtrackEvent {

    private String userId;

    private String soundtrackId;

    private String title;

    private String author;

    private String type;

    private Integer rate;
}