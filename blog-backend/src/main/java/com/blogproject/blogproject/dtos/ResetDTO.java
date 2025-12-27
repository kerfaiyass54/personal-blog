package com.blogproject.blogproject.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ResetDTO {

    private String email;
    private String code;
    private Instant expiration;
    private boolean used;
}
