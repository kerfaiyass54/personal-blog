package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.UserDTO;
import com.blogproject.blogproject.dtos.UserLogin;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.UserRole;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@Slf4j
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
        if(user.getRole() == null) user.setRole(UserRole.READER); // default role
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

    public boolean checkPassword(String email, String pass) {
        String password = passwordEncoder.encode(pass);
        Optional<User> dbUser = userRepository.findByEmail(email);
        return dbUser.isPresent() && passwordEncoder.matches(password, dbUser.get().getPassword());
    }

    public UserRole getRole(String email) {
        Optional<User> dbUser = userRepository.findByEmail(email);
        return dbUser.map(User::getRole).orElse(null);
    }

    public void changePassword(String email, String password){
        Optional<User> dbUser = userRepository.findByEmail(email);
        if(dbUser.isPresent()){
            User user = dbUser.get();
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
        }
    }

    public boolean hasItProfile(String username){
        Optional<User> dbUser = userRepository.findByEmail(username);
        return dbUser.filter(user -> user.getProfile() != null).isPresent();
    }

    public String getUsername(String email){
        Optional<User> dbUser = userRepository.findByEmail(email);
        return dbUser.map(User::getName).orElse(null);
    }


}

