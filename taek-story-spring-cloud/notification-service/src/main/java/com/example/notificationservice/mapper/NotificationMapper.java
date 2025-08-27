package com.example.notificationservice.mapper;

import com.example.notificationservice.model.Notification;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {
	List<Notification> allNotifications(Long userSeq, String searchWord);

	int readBySeq(Long seq);

	int readAll(Long userSeq);

	int insertNotification(Notification notification);
}
