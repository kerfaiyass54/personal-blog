package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResetPasswordRepository extends MongoRepository<PasswordResetToken, String> {

    public PasswordResetToken findPasswordResetTokenByEmail(String email);

    public List<PasswordResetToken> findPasswordResetTokensByEmail(String email);

    public PasswordResetToken findPasswordResetTokenByEmailAndCodeAndUsed(String email, String code, boolean used);
}
