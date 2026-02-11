package com.blogproject.blogproject.filter;

import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public JwtFilter(JwtUtil jwtUtil,  UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        return path.startsWith("/user/")
                || path.startsWith("/reset")
                || path.startsWith("/sessions/");
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing JWT");
            return;
        }

        String token = authHeader.substring(7);

        String email = jwtUtil.getUsername(token);



        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

// 🔥 NEW LOGIC STARTS HERE

        Date issuedAtDate = jwtUtil.getIssuedAt(token);
        Instant tokenIssuedAt = issuedAtDate.toInstant();

        if (user.getPasswordChangedAt() != null &&
                tokenIssuedAt.isBefore(user.getPasswordChangedAt())) {

            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                    "Password changed. Please login again.");
            return;
        }

        if (!jwtUtil.validateToken(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT");
            return;
        }

        filterChain.doFilter(request, response);
    }
}


