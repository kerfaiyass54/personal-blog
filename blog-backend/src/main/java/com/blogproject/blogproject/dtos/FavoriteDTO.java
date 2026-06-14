package com.blogproject.blogproject.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteDTO {

    private String id;
    private String userEmail;
    private String skillName;
}
