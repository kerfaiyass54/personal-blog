package com.blogproject.blogproject.config;

import com.blogproject.blogproject.dtos.SkillRecommendationDTO;

import com.blogproject.blogproject.dtos.SkillRecommendationDTO;
import org.apache.kafka.clients.consumer.ConsumerConfig;

import org.apache.kafka.common.serialization.StringDeserializer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

import org.springframework.kafka.core.*;

import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaRecommendationConsumerConfig {

    @Bean
    public ConsumerFactory<String, SkillRecommendationDTO> consumerFactorySkill() {

        Map<String,Object> config = new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                "localhost:9092"
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                "recommendation-group"
        );

        config.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                "earliest"
        );

        JsonDeserializer<SkillRecommendationDTO> deserializer =
                new JsonDeserializer<>(SkillRecommendationDTO.class);

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
            SkillRecommendationDTO
            > kafkaListenerContainerFactorySkill() {

        ConcurrentKafkaListenerContainerFactory<
                String,
                SkillRecommendationDTO
                > factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                consumerFactorySkill()
        );

        return factory;
    }
}