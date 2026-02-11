package com.blogproject.blogproject.service;


import com.blogproject.blogproject.entities.PasswordResetToken;
import com.blogproject.blogproject.repository.ResetPasswordRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
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

    public boolean verifyCode(String code, String email) {
        List<String> passwordResetTokenCodesList = resetPasswordRepository.findPasswordResetTokensByEmail(email).stream().map(PasswordResetToken::getCode).toList();
        if (passwordResetTokenCodesList.contains(code)) {
            PasswordResetToken passwordResetDTO = resetPasswordRepository.findPasswordResetTokenByEmailAndCodeAndUsed(email,code,false);
            passwordResetDTO.setUsed(true);
            resetPasswordRepository.save(passwordResetDTO);
            return true;
        }
        else{
            return false;
        }
    }


}
