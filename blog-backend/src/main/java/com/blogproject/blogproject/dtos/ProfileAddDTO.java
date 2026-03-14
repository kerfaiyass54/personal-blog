package com.blogproject.blogproject.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ProfileAddDTO {

    private String firstName;
    private String lastName;
    private String job;
    private Instant birthDate;
    private String nationality;
    private String city;
    private List<String> interests;
}
