package com.blogproject.blogproject.dtos;


import com.blogproject.blogproject.enums.ActivityType;
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
public class SessionDTO {

    private String id;
    private String email;
    private Instant time;
    private String os;
    private String browser;
    private boolean me;
    private ActivityType alert;
}
