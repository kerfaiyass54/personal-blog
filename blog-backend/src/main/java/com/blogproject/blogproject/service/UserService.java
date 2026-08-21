package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.UserRole;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;


    // =========================================================
    // REGISTER
    // =========================================================

    public User register(UserDTO userDTO) {

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException(
                    "Email is already registered"
            );
        }

        UserRole role =
                userDTO.getRole() != null
                        ? userDTO.getRole()
                        : UserRole.READER;

        User user = User.builder()
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .password(
                        passwordEncoder.encode(
                                userDTO.getPassword()
                        )
                )
                .role(role)
                .build();

        return userRepository.save(user);
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @Transactional(readOnly = true)
    public String login(UserLogin userLogin) {

        User user =
                userRepository.findByEmail(
                        userLogin.getEmail()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Invalid username or password"
                        ));

        boolean passwordMatches =
                passwordEncoder.matches(
                        userLogin.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        return jwtUtil.generateToken(
                user.getName(),
                user.getRole()
        );
    }


    // =========================================================
    // CHECK EMAIL
    // =========================================================

    @Transactional(readOnly = true)
    public boolean emailExists(
            String email
    ) {

        return userRepository.existsByEmail(email);
    }


    // =========================================================
    // CHECK PASSWORD
    // =========================================================

    @Transactional(readOnly = true)
    public boolean checkPassword(
            String email,
            String rawPassword
    ) {

        return userRepository.findByEmail(email)
                .map(user ->
                        passwordEncoder.matches(
                                rawPassword,
                                user.getPassword()
                        )
                )
                .orElse(false);
    }


    // =========================================================
    // GET ROLE
    // =========================================================

    @Transactional(readOnly = true)
    public UserRole getRole(
            String email
    ) {

        return userRepository.findByEmail(email)
                .map(User::getRole)
                .orElse(null);
    }


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    public void changePassword(
            String email,
            String newPassword
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                ));

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        user.setPasswordChangedAt(
                java.time.Instant.now()
        );

        userRepository.save(user);
    }


    // =========================================================
    // CHECK PROFILE
    // =========================================================

    @Transactional(readOnly = true)
    public boolean hasProfile(
            String userId
    ) {

        return userRepository
                .findById(userId)
                .map(user ->
                        user.getProfileId() != null
                )
                .orElse(false);
    }


    // =========================================================
    // GET USERNAME
    // =========================================================

    @Transactional(readOnly = true)
    public String getUsername(
            String email
    ) {

        return userRepository.findByEmail(email)
                .map(User::getName)
                .orElse(null);
    }

    @Indexed(unique = true, sparse = true)
    private String profileId;
}