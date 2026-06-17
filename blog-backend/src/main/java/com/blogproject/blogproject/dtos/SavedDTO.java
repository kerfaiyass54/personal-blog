package com.blogproject.blogproject.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SavedDTO {

    private String id;
    private String userEmail;
    private String articleId;
}
