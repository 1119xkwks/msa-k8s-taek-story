package com.example.notificationservice.websocket;

import com.example.notificationservice.model.Notification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationPublisher {

	private final SimpMessagingTemplate messagingTemplate;

	public void publishToUser(Notification notification) {
		if (notification == null || notification.getToUserSeq() == null) {
			return;
		}
		String destination = "/topic/notifications." + notification.getToUserSeq();
		log.info("[WS] publish {} -> {}", destination, notification);
		messagingTemplate.convertAndSend(destination, notification);
	}
}
