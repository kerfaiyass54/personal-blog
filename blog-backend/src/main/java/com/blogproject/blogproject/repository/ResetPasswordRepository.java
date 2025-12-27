package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResetPasswordRepository extends MongoRepository<PasswordResetToken, String> {

    public PasswordResetToken findPasswordResetTokenByEmail(String email);
}
