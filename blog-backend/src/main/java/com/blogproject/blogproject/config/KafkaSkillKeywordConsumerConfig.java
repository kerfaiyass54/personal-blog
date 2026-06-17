package com.blogproject.blogproject.config;

import com.blogproject.blogproject.dtos.SkillKeywordsDTO;

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
public class KafkaSkillKeywordConsumerConfig {

    @Bean
    public ConsumerFactory<String, SkillKeywordsDTO>
    consumerFactorySkillKeyword() {

        Map<String, Object> config =
                new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "skill-keyword-group"
        );

        config.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<SkillKeywordsDTO>
                deserializer =
                new JsonDeserializer<>(
                        SkillKeywordsDTO.class
                );

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                deserializer
        );
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<
            String,
            SkillKeywordsDTO
            > kafkaListenerContainerFactorySkillKeyword() {

        ConcurrentKafkaListenerContainerFactory<
                String,
                SkillKeywordsDTO
                > factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                consumerFactorySkillKeyword()
        );

        return factory;
    }
}