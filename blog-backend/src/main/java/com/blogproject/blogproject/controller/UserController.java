package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        User user = userService.register(userDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) {
        try {
            String role = userService.getRole(userLogin.getEmail());
            String token = userService.login(userLogin);
            return ResponseEntity.ok(Map.of("token", token,
                    "role", role));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/exist")
    public ResponseEntity<Boolean> existEmail(@RequestBody UserLogin userLogin) {
        boolean emailIsExisted = userService.checkEmailExist(userLogin.getEmail());
        return new ResponseEntity<>(emailIsExisted, HttpStatus.OK);
    }

    @PostMapping("/password")
    public ResponseEntity<Boolean> checkPassword(@RequestBody UserLogin userLogin) {
        boolean passwordIsValid = userService.checkPassword(userLogin.getEmail(), userLogin.getPassword());
        return new ResponseEntity<>(passwordIsValid, HttpStatus.OK);
    }



}
