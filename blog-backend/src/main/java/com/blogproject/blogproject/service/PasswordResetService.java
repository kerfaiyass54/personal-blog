package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.ResetDTO;
import com.blogproject.blogproject.entities.PasswordResetToken;
import com.blogproject.blogproject.repository.ResetPasswordRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
public class PasswordResetService {


    private final ResetPasswordRepository resetPasswordRepository;
    private final EmailService emailService;

    public PasswordResetService(ResetPasswordRepository resetPasswordRepository, EmailService emailService) {
        this.resetPasswordRepository = resetPasswordRepository;
        this.emailService = emailService;
    }

    public void sendResetCode(String email) {
        String code = String.valueOf(100000 + new Random().nextInt(900000));
        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setCode(code);
        token.setExpiration(Instant.now().plusSeconds(600));
        token.setUsed(false);
        resetPasswordRepository.save(token);
        emailService.sendEmail(
                email,
                "Password reset code",
                "Your reset code is: " + code
        );
    }

    public boolean verifyCode(ResetDTO request) {
        PasswordResetToken token = resetPasswordRepository
                .findPasswordResetTokenByEmail(request.getEmail());
        if (!request.getCode().equals(token.getCode())) {
            return false;
        }
        else{
            token.setUsed(true);
            resetPasswordRepository.save(token);
            return true;
        }
    }


}
