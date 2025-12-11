package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User register(UserDTO user) {
        User userEntity = new User();
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setRole(user.getRole());
        userEntity.setName(user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole() == null) user.setRole("READER"); // default role
        return userRepository.save(userEntity);
    }

    public String login(UserLogin userLogin) {
        Optional<User> dbUser = userRepository.findByEmail(userLogin.getEmail());
        String rawPassword = userLogin.getPassword();
        if (dbUser.isPresent()) {
            String hashedPassword = dbUser.get().getPassword();
            boolean matches = passwordEncoder.matches(rawPassword, hashedPassword);
            if(matches){

            }
            return jwtUtil.generateToken(dbUser.get().getName(), dbUser.get().getRole());
        }

        throw new RuntimeException("Invalid username or password");
    }

    public boolean checkEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean checkPassword(String email, String password) {
        if(userRepository.findByEmail(email).isPresent()) {
            return userRepository.findByEmail(email).get().getPassword().equals(password);
        }
        return false;
    }

    public String getRole(String email) {
        return userRepository.findByEmail(email).get().getRole();
    }



}

