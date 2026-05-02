package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SoundtrackDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, SoundtrackDTO> kafkaTemplate;

    public void sendSoundtrack(Soundtrack soundtrack) {

        SoundtrackDTO dto = new SoundtrackDTO(
                soundtrack.getId(),
                soundtrack.getTitle(),
                soundtrack.getLink(),
                soundtrack.getType().name()
        );

        String TOPIC = "soundtrack-input";
        kafkaTemplate.send(TOPIC, dto);
    }
}