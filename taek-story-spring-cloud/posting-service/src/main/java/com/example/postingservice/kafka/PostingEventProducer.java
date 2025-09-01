package com.example.postingservice.kafka;

import com.example.postingservice.model.PostingEventPayload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PostingEventProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;

	public void sendPostingFriends(PostingEventPayload payload) {
		String topic = "posting.user.friends";
		log.info("[Kafka] sending to {} payload={}", topic, payload);
		kafkaTemplate.send(topic, payload.getKey(), payload.toString());
	}
}
