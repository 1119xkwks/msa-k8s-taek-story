package com.example.notificationservice.service;

import com.example.notificationservice.model.FriendRequestPayload;
import com.example.notificationservice.model.Notification;
import com.example.notificationservice.model.PostingEventPayload;
import com.example.notificationservice.model.Users;

import java.util.List;

public interface NotificationService {
	List<Notification> allNotifications(Users loggedIn, String searchWord);

	void readBySeq(Long seq);

	void readAll(Users loggedIn);

	int insertNotification(Notification notification);
}
