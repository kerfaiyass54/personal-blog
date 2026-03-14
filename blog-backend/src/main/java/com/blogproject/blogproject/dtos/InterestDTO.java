package com.blogproject.blogproject.dtos;


import com.blogproject.blogproject.enums.InterestType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class InterestDTO {

    private String id;
    private String name;
    private InterestType  interestType;
    private String description;
}
