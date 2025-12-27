package com.blogproject.blogproject.entities;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class PasswordResetToken {
    /*
    id
email
code_hash
expires_at
used

     */
    @Id
    private String id;
    private String email;
    private String code;
    private Instant expiration;
    private boolean used;

}
