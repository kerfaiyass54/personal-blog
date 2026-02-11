package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.service.PasswordResetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reset")
@CrossOrigin("*")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @GetMapping("")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        passwordResetService.sendResetCode(email);
        return ResponseEntity.ok("Code sent");
    }

    @GetMapping("/code")
    public ResponseEntity<Boolean> verifyCode(@RequestParam String code, @RequestParam String email) {
        boolean val = passwordResetService.verifyCode(code,email);
        return new ResponseEntity<>(val, HttpStatus.OK);
    }


}
