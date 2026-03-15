package com.blogproject.blogproject.config;

import com.blogproject.blogproject.entities.Interest;
import com.blogproject.blogproject.enums.InterestType;
import com.blogproject.blogproject.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final InterestRepository interestRepository;

    @Override
    public void run(String... args) {
        seedInterests();
    }

    private void seedInterests() {
        try {
            ClassPathResource resource = new ClassPathResource("interests.csv");
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)
            );

            List<Interest> toSave = new ArrayList<>();

            String line;
            reader.readLine();

            while ((line = reader.readLine()) != null) {
                if (line.isBlank()) continue;

                String[] parts = line.split(",", 3);
                if (parts.length < 3) continue;

                String name            = parts[0].trim();
                String interestTypeStr = parts[1].trim();
                String description     = parts[2].trim();

                if (interestRepository.existsByName(name)) {
                    log.info("Interest '{}' already exists — skipping.", name);
                    continue;
                }

                InterestType type;
                try {
                    type = InterestType.valueOf(interestTypeStr);
                } catch (IllegalArgumentException e) {
                    log.warn("Unknown InterestType '{}' for interest '{}' — skipping.", interestTypeStr, name);
                    continue;
                }

                Interest interest = new Interest();
                interest.setName(name);
                interest.setInterestType(type);
                interest.setDescription(description);

                toSave.add(interest);
            }

            reader.close();

            if (!toSave.isEmpty()) {
                interestRepository.saveAll(toSave);
                log.info("Seeded {} new interests from interests.csv", toSave.size());
            } else {
                log.info("All interests already exist — nothing to seed.");
            }

        } catch (Exception e) {
            log.error("Failed to seed interests from CSV: {}", e.getMessage(), e);
        }
    }
}