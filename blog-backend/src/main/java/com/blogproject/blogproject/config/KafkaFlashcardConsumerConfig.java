package com.blogproject.blogproject.config;

import com.blogproject.blogproject.dtos.FlashcardDto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaFlashcardConsumerConfig {

    @Bean
    public ConsumerFactory<String, FlashcardDto>
    flashcardConsumerFactory() {

        Map<String, Object> config =
                new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "flashcard-group"
        );

        config.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<FlashcardDto> deserializer =
                new JsonDeserializer<>(
                        FlashcardDto.class
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                deserializer
        );
    }

    @Bean(name = "flashcardKafkaListenerFactory")
    public ConcurrentKafkaListenerContainerFactory<
            String,
            FlashcardDto>
    flashcardKafkaListenerFactory() {

        ConcurrentKafkaListenerContainerFactory<
                String,
                FlashcardDto> factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                flashcardConsumerFactory()
        );

        return factory;
    }
}