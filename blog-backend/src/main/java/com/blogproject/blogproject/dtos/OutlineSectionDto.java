package com.blogproject.blogproject.dtos;

import lombok.Data;

import java.util.List;

@Data
public class OutlineSectionDto {

    private String heading;

    private String purpose;

    private List<String> ideas;
}