package com.example.notificationservice.kafka;

import com.example.notificationservice.model.FriendRequestPayload;
import com.example.notificationservice.model.Notification;
import com.example.notificationservice.model.PostingEventPayload;
import com.example.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.List;

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

		Notification notification = Notification.fromFriendRequestPayload( payload );
		int insertCnt = notificationService.insertNotification(notification);
    }

    @KafkaListener(topics = "user.notifications.posting", groupId = "notification-service")
    public void onPostingEvent(@Payload String message) {
        log.info("[Kafka] received user event: {}", message);
		PostingEventPayload payload = PostingEventPayload.fromJson( message );
		log.info("[Kafka] parsed payload: {}", payload);

		List<Notification> notifications = Notification.fromPostingEventPayload( payload );
		notifications.forEach(notificationService::insertNotification);
    }
}


