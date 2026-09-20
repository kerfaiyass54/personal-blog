package com.blogproject.blogproject.config;

import com.blogproject.blogproject.filter.JwtFilter;
import com.blogproject.blogproject.repository.UserRepository;
import com.blogproject.blogproject.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PublicEndpoints publicEndpoints;
    private final JwtFilter jwtFilter;

    public SecurityConfig(
            JwtUtil jwtUtil,
            UserRepository userRepository,
            PublicEndpoints publicEndpoints,
            JwtFilter jwtFilter
    ) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.publicEndpoints = publicEndpoints;
        this.jwtFilter = jwtFilter;
    }


    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // -------------------------------------------------
                // CORS
                // -------------------------------------------------

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                // -------------------------------------------------
                // CSRF
                // -------------------------------------------------

                .csrf(csrf ->
                        csrf.disable()
                )

                // -------------------------------------------------
                // AUTHORIZATION
                // -------------------------------------------------

                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(
                                        publicEndpoints
                                                .getPatterns()
                                                .toArray(new String[0])
                                )
                                .permitAll()

                                .anyRequest()
                                .authenticated()
                )

                // -------------------------------------------------
                // SESSION
                // -------------------------------------------------

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // -------------------------------------------------
                // JWT FILTER
                // -------------------------------------------------

                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =========================================================
    // CORS
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config =
                new CorsConfiguration();

        config.setAllowedOrigins(
                List.of("http://localhost:4200")
        );

        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        config.setAllowedHeaders(
                List.of("*")
        );

        config.setAllowCredentials(false);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return source;
    }


}