package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
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
    public ResponseEntity<String> login(@RequestBody UserLogin  userLogin) {
        String message = userService.login(userLogin);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }



}
