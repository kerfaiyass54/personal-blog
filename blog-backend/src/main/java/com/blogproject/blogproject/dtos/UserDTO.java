package com.blogproject.blogproject.dtos;


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
public class UserDTO {

    private String id;
    private String name;
    private String email;
    private String password;
    private String role;


}
