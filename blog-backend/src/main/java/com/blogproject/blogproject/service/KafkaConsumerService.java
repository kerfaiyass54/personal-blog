package com.blogproject.blogproject.service;

import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final SoundtrackRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "soundtrack-rated")
    public void consume(String message) {

        try {
            Map<String, Object> data = objectMapper.readValue(message, Map.class);

            String id = (String) data.get("id");
            Double rating = Double.valueOf(data.get("predicted_rating").toString());

            Soundtrack soundtrack = repository.findById(id).orElseThrow();

            soundtrack.setRate(rating.intValue());

            repository.save(soundtrack);

            System.out.println("✅ Rating updated: " + rating);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}