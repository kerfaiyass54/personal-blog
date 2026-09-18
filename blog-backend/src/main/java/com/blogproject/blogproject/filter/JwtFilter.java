package com.blogproject.blogproject.filter;

import com.blogproject.blogproject.config.PublicEndpoints;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PublicEndpoints publicEndpoints;

    private final AntPathMatcher pathMatcher =
            new AntPathMatcher();


    public JwtFilter(
            JwtUtil jwtUtil,
            UserRepository userRepository,
            PublicEndpoints publicEndpoints
    ) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.publicEndpoints = publicEndpoints;
    }


    // =========================================================
    // SKIP JWT FOR PUBLIC ENDPOINTS
    // =========================================================

    @Override
    protected boolean shouldNotFilter(
            HttpServletRequest request
    ) {

        String path =
                request.getRequestURI();

        return publicEndpoints
                .getPatterns()
                .stream()
                .anyMatch(pattern ->
                        pathMatcher.match(
                                pattern,
                                path
                        )
                );
    }


    // =========================================================
    // JWT FILTER
    // =========================================================

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )
            throws ServletException, IOException {


        // -----------------------------------------------------
        // OPTIONS / CORS PREFLIGHT
        // -----------------------------------------------------

        if ("OPTIONS".equalsIgnoreCase(
                request.getMethod()
        )) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // -----------------------------------------------------
        // GET AUTHORIZATION HEADER
        // -----------------------------------------------------

        String authHeader =
                request.getHeader("Authorization");


        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Missing JWT"
            );

            return;
        }


        // -----------------------------------------------------
        // EXTRACT TOKEN
        // -----------------------------------------------------

        String token =
                authHeader.substring(7);


        // -----------------------------------------------------
        // VALIDATE TOKEN FIRST
        // -----------------------------------------------------

        if (!jwtUtil.validateToken(token)) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Invalid JWT"
            );

            return;
        }


        // -----------------------------------------------------
        // GET EMAIL FROM JWT
        // -----------------------------------------------------

        String email =
                jwtUtil.getEmail(token);


        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);


        if (user == null) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "User not found"
            );

            return;
        }


        // -----------------------------------------------------
        // CHECK PASSWORD CHANGE
        // -----------------------------------------------------

        Date issuedAtDate =
                jwtUtil.getIssuedAt(token);

        Instant tokenIssuedAt =
                issuedAtDate.toInstant();


        if (user.getPasswordChangedAt() != null &&
                tokenIssuedAt.isBefore(
                        user.getPasswordChangedAt()
                )) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Password changed. Please login again."
            );

            return;
        }


        // -----------------------------------------------------
        // CONTINUE
        // -----------------------------------------------------

        filterChain.doFilter(
                request,
                response
        );
    }
}