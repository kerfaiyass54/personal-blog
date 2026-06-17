package com.blogproject.blogproject.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ArticleDisplayDTO {

    private String id;
    private String title;
    private String content;
    private Date dateInsert;
    private Date dateUpdate;
}
