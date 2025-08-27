package com.example.notificationservice.kafka;

import com.example.notificationservice.model.FriendRequestPayload;
import com.example.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventListener {
	private final NotificationService notificationService;

    @KafkaListener(topics = "user.notifications.friend", groupId = "notification-service")
    public void onUserEvent(@Payload String message) {
        log.info("[Kafka] received user event: {}", message);
		FriendRequestPayload payload = FriendRequestPayload.fromJson( message );
		log.info("[Kafka] parsed payload: {}", payload);
		int insertCnt = notificationService.insertNotificationByPayload(payload);
    }
}


