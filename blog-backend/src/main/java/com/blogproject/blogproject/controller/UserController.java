package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.dtos.UserPasswordCheckDTO;
import com.blogproject.blogproject.dtos.UserResponseDTO;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.service.UserService;
import com.blogproject.blogproject.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(
            UserService userService,
            JwtUtil jwtUtil
    ) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    // =========================================================
    // REGISTER
    // =========================================================

    @PostMapping
    public ResponseEntity<UserResponseDTO> register(
            @RequestBody UserDTO userDTO
    ) {
        UserResponseDTO response =
                userService.register(userDTO);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }


    // =========================================================
    // GET USERNAME
    // =========================================================

    @GetMapping("/username")
    public ResponseEntity<String> getUsername(
            @RequestParam String email
    ) {
        String username = userService.getUsername(email);

        return new ResponseEntity<>(
                username,
                HttpStatus.OK
        );
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody UserLogin userLogin
    ) {
        try {

            String token = userService.login(userLogin);

            String role = String.valueOf(
                    userService.getRole(userLogin.getEmail())
            );

            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "role", role
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================================================
    // CHECK EMAIL
    // =========================================================

    @GetMapping("/email")
    public ResponseEntity<Boolean> existEmail(
            @RequestParam String emailToTest
    ) {

        boolean emailIsExisted =
                userService.emailExists(emailToTest);

        return new ResponseEntity<>(
                emailIsExisted,
                HttpStatus.OK
        );
    }


    // =========================================================
    // CHECK PASSWORD
    // =========================================================

    @PostMapping("/check-password")
    public ResponseEntity<Boolean> checkPassword(
            @RequestBody UserPasswordCheckDTO request
    ) {

        boolean passwordIsValid =
                userService.checkPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        return new ResponseEntity<>(
                passwordIsValid,
                HttpStatus.OK
        );
    }


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(
            @RequestHeader(
                    value = "Authorization",
                    required = false
            )
            String authorization,

            @RequestParam String currentPassword,

            @RequestParam String newPassword
    ) {

        try {

            // -------------------------------------------------
            // CHECK AUTHORIZATION HEADER
            // -------------------------------------------------

            if (authorization == null ||
                    !authorization.startsWith("Bearer ")) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(
                                Map.of(
                                        "error",
                                        "Missing or invalid Authorization header"
                                )
                        );
            }


            // -------------------------------------------------
            // EXTRACT JWT
            // -------------------------------------------------

            String token =
                    authorization.substring(7);


            // -------------------------------------------------
            // VALIDATE JWT
            // -------------------------------------------------

            if (!jwtUtil.validateToken(token)) {

                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(
                                Map.of(
                                        "error",
                                        "Invalid or expired token"
                                )
                        );
            }


            // -------------------------------------------------
            // GET EMAIL FROM JWT
            // -------------------------------------------------
            // IMPORTANT:
            // Never take the email from the request.
            // The authenticated identity comes from the JWT.

            String email =
                    jwtUtil.getEmail(token);


            // -------------------------------------------------
            // CHANGE PASSWORD
            // -------------------------------------------------

            userService.changePassword(
                    email,
                    currentPassword,
                    newPassword
            );


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Password changed successfully"
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(
                            Map.of(
                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================================================
    // CHECK USER PROFILE
    // =========================================================

    @GetMapping("/profile/{username}")
    public ResponseEntity<Boolean> checkUserProfile(
            @PathVariable String username
    ) {

        boolean hasItProfile =
                userService.hasProfile(username);

        return new ResponseEntity<>(
                hasItProfile,
                HttpStatus.OK
        );
    }
}