package com.blogproject.blogproject.service;

import com.blogproject.blogproject.entities.PasswordResetToken;
import com.blogproject.blogproject.repository.ResetPasswordRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;

@Service
@Slf4j
public class PasswordResetService {

    private final ResetPasswordRepository resetPasswordRepository;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    public PasswordResetService(ResetPasswordRepository resetPasswordRepository,
                                EmailService emailService) {
        this.resetPasswordRepository = resetPasswordRepository;
        this.emailService = emailService;
    }

    public void sendResetCode(String email) {

        String code = String.valueOf(100000 + secureRandom.nextInt(900000));

        PasswordResetToken token = new PasswordResetToken();
        token.setEmail(email);
        token.setCode(code);
        token.setExpiration(Instant.now().plusSeconds(600));
        token.setUsed(false);

        resetPasswordRepository.save(token);

        String subject = "Password Reset Request";

        String message = "Dear User,\n\n"
                + "We received a request to reset your account password.\n\n"
                + "Your verification code is: " + code + "\n\n"
                + "This code will expire in 10 minutes.\n"
                + "If you did not request a password reset, please ignore this email.\n\n"
                + "Best regards,\n"
                + "Support Team";

        emailService.sendEmail(email, subject, message);
    }

    public boolean verifyCode(String code, String email) {

        PasswordResetToken token =
                resetPasswordRepository.findPasswordResetTokenByEmailAndCodeAndUsed(email, code, false);

        if (token == null) {
            return false;
        }

        if (token.getExpiration().isBefore(Instant.now())) {
            return false;
        }

        token.setUsed(true);
        resetPasswordRepository.save(token);

        return true;
    }
}