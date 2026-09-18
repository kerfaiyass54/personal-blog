package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.PasswordResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ResetPasswordRepository extends MongoRepository<PasswordResetToken, String> {


    public PasswordResetToken findPasswordResetTokenByEmailAndCodeAndUsed(String email, String code, boolean used);
}
