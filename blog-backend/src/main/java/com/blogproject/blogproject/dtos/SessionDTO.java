package com.blogproject.blogproject.dtos;


import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class SessionDTO {

    private String email;
    private Instant time;
    private String os;
    private String browser;
    private boolean isMe;
    private boolean active;
}
