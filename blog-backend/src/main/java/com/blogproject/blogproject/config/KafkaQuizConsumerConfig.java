package com.blogproject.blogproject.config;

import com.blogproject.blogproject.dtos.QuizGeneratedDTO;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaQuizConsumerConfig {

    @Value("${bootstrap.server.config}")
    private String bootstrapServers;

    @Value("${kafka.group.quiz}")
    private String groupId;

    @Value("${kafka.consumer.auto-offset-reset}")
    private String autoOffsetReset;

    @Value("${kafka.consumer.enable-auto-commit}")
    private boolean enableAutoCommit;

    @Bean
    public ConsumerFactory<String, QuizGeneratedDTO>
    quizConsumerFactory() {

        Map<String, Object> config = new HashMap<>();

        config.put(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                bootstrapServers
        );

        config.put(
                ConsumerConfig.GROUP_ID_CONFIG,
                groupId
        );

        config.put(
                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,
                autoOffsetReset
        );

        config.put(
                ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG,
                enableAutoCommit
        );

        JsonDeserializer<QuizGeneratedDTO> deserializer =
                new JsonDeserializer<>(QuizGeneratedDTO.class);

        deserializer.addTrustedPackages("*");

        return new DefaultKafkaConsumerFactory<>(
                config,
                new StringDeserializer(),
                deserializer
        );
    }

    @Bean(name = "quizKafkaListenerFactory")
    public ConcurrentKafkaListenerContainerFactory<
            String,
            QuizGeneratedDTO
            > quizKafkaListenerFactory() {

        ConcurrentKafkaListenerContainerFactory<
                String,
                QuizGeneratedDTO
                > factory =
                new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(
                quizConsumerFactory()
        );

        return factory;
    }
}