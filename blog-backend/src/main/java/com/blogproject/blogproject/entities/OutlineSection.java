package com.blogproject.blogproject.entities;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutlineSection {

    private String heading;

    private String purpose;

    private List<String> ideas;
}