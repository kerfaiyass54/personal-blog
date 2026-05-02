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

    public void sendSoundtrack(SoundtrackDTO soundtrackDTO) {

        String TOPIC = "soundtrack-input";
        kafkaTemplate.send(TOPIC, soundtrackDTO);
    }
}