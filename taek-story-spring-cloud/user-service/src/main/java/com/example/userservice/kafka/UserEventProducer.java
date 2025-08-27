package com.example.userservice.kafka;

import com.example.userservice.model.FriendRequestPayload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendFriendRequested(FriendRequestPayload payload) {
        String topic = "user.notifications.friend";
        log.info("[Kafka] sending to {} payload={}", topic, payload);
        kafkaTemplate.send(topic, payload.getKey(), payload.toString());
    }
}


