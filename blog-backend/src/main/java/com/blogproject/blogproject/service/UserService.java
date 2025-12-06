package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
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
        if(user.getRole() == null) user.setRole("USER"); // default role
        return userRepository.save(userEntity);
    }

    public String login(UserLogin user) {
        Optional<User> dbUser = userRepository.findByEmail(user.getEmail());
        if(dbUser.isPresent() && passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword())) {
            return jwtUtil.generateToken(dbUser.get().getName(), dbUser.get().getRole());
        }
        return "Invalid username or password";
    }



}

