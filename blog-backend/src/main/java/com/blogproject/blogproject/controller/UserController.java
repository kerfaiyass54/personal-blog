package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLogin userLogin) {
        try {
            String token = userService.login(userLogin);
            String role = String.valueOf(userService.getRole(userLogin.getEmail()));

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", role
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/email")
    public ResponseEntity<Boolean> existEmail(@RequestParam String emailToTest) {
        boolean emailIsExisted = userService.checkEmailExist(emailToTest);
        return new ResponseEntity<>(emailIsExisted, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Boolean> checkPassword(@RequestParam  String emailLogin, @RequestParam String password) {
        boolean passwordIsValid = userService.checkPassword(emailLogin, password);
        return new ResponseEntity<>(passwordIsValid, HttpStatus.OK);
    }


    @PatchMapping("/")
    public ResponseEntity<Void> changePassword( @RequestParam String email, @RequestParam String newPass) {
        userService.changePassword(email, newPass);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
