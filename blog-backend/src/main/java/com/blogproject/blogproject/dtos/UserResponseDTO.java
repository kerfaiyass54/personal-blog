package com.blogproject.blogproject.dtos;

import com.blogproject.blogproject.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {

    private String id;

    private String name;

    private String email;

    private UserRole role;

    private Instant passwordChangedAt;

    private String profileId;
}