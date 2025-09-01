package com.example.userservice.kafka;

import com.example.userservice.model.PostingEventPayload;
import com.example.userservice.service.FriendService;
import com.example.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class PostingEventListener {

	private final FriendService friendService;
	private final UserEventProducer userEventProducer;

	@KafkaListener(topics = "posting.user.friends", groupId = "user-service")
	public void onPostingEvent(@Payload String message) {
		log.info("[Kafka] received posting event: {}", message);
		PostingEventPayload payload = PostingEventPayload.fromJson( message );
		log.info("[Kafka] parsed payload: {}", payload);

		List<Long> friendSeqs = friendService.friendUserSeqsByUserSeq( payload.getUserSeq() );
		payload.setFriendSeqs( friendSeqs );

		userEventProducer.sendUserPosting( payload );
	}
}
