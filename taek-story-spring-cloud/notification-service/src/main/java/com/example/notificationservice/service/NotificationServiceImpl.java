package com.example.notificationservice.service;

import com.example.notificationservice.mapper.NotificationMapper;
import com.example.notificationservice.model.FriendRequestPayload;
import com.example.notificationservice.model.Notification;
import com.example.notificationservice.model.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	private final NotificationMapper notificationMapper;

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
	public int insertNotificationByPayload(FriendRequestPayload payload) {
		Notification notification = Notification.fromFriendRequestPayload( payload );
		log.debug("[insertNotificationByPayload] notification : {}", notification);
		int insertCnt = notificationMapper.insertNotification(notification);
		return insertCnt;
	}
}
