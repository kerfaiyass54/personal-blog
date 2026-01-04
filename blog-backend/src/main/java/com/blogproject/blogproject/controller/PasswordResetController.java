package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.ResetDTO;
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

    @GetMapping("/{email}")
    public ResponseEntity<?> forgotPassword(@PathVariable String email) {
        passwordResetService.sendResetCode(email);
        return ResponseEntity.ok("Code sent");
    }

    @PostMapping("/code")
    public ResponseEntity<Boolean> verifyCode(@RequestBody ResetDTO request) {
        boolean val = passwordResetService.verifyCode(request);
        return new ResponseEntity<>(val, HttpStatus.OK);
    }


}
