package com.blogproject.blogproject.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SocialMediaDTO {

    private String id;
    private String name;
    private String link;
    private String userName;
    private String userEmail;
    private String description;
}
