package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.ResetDTO;
import com.blogproject.blogproject.service.PasswordResetService;
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

    @PostMapping("/{email}")
    public ResponseEntity<?> forgotPassword(@PathVariable String email) {
        passwordResetService.sendResetCode(email);
        return ResponseEntity.ok("Code sent");
    }

    @PostMapping("/code")
    public ResponseEntity<?> verifyCode(@RequestBody ResetDTO request) {
        passwordResetService.verifyCode(request);
        return ResponseEntity.ok("Code valid");
    }


}
