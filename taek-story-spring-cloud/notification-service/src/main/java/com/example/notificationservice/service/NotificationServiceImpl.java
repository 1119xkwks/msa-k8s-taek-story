package com.example.notificationservice.service;

import com.example.notificationservice.mapper.NotificationMapper;
import com.example.notificationservice.model.FriendRequestPayload;
import com.example.notificationservice.model.Notification;
import com.example.notificationservice.model.PostingEventPayload;
import com.example.notificationservice.model.Users;
import com.example.notificationservice.websocket.NotificationPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper notificationMapper;
	private final NotificationPublisher notificationPublisher;

	@Override
	public List<Notification> allNotifications(Users loggedIn, String searchWord) {
		return notificationMapper.allNotifications(loggedIn.getSeq(), searchWord);
	}

	@Override
	public void readBySeq(Long seq) {
		notificationMapper.readBySeq(seq);
	}

	@Override
	public void readAll(Users loggedIn) {
		notificationMapper.readAll(loggedIn.getSeq());
	}

	@Override
	public int insertNotification(Notification notification) {
		log.debug("[insertNotification] notification : {}", notification);
		int insertCnt = notificationMapper.insertNotification(notification);
		if (insertCnt > 0) {
			notificationPublisher.publishToUser(notification);
		}
		return insertCnt;
	}
}
