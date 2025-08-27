package com.example.notificationservice.model;

import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

/**
 * 알림 DTO
 */
@Getter
@Setter
@ToString
@Alias("notification")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

	/** 순번 (자동 증가, PK) */
	private Long seq;

	/** 알림 대상 사용자 seq */
	private Long toUserSeq;

	/** 알림 발생 사용자 seq */
	private Long fromUserSeq;

	/** 알림 종류 */
	private String type;

	/** 알림 메시지 */
	private String message;

	/** 읽음 여부 */
	private Boolean isRead;

	/** 생성일 */
	private LocalDateTime crtDt;

	/** 생성 IP */
	private String crtIp;

	/** 생성자 seq */
	private Long crtSeq;

	/** 수정일 */
	private LocalDateTime udtDt;

	/** 수정 IP */
	private String udtIp;

	/** 수정자 seq */
	private Long udtSeq;

	/**
	 * Notification 생성 헬퍼
	 */
	public static Notification ofRequest(Long toUserSeq, Long fromUserSeq, String type, String message, Boolean isRead,
										 Users loggedIn, String ip) {
		Notification notification = new Notification();
		notification.setToUserSeq(toUserSeq);
		notification.setFromUserSeq(fromUserSeq);
		notification.setType(type);
		notification.setMessage(message);
		notification.setIsRead(isRead != null ? isRead : false);

		if (loggedIn != null) {
			notification.setCrtSeq(loggedIn.getSeq());
			notification.setUdtSeq(loggedIn.getSeq());
		}

		if (ip != null && !ip.isBlank()) {
			notification.setCrtIp(ip);
			notification.setUdtIp(ip);
		}

		notification.setCrtDt(LocalDateTime.now());
		notification.setUdtDt(LocalDateTime.now());

		return notification;
	}

	public static Notification fromFriendRequestPayload(FriendRequestPayload payload) {
		Notification notification = new Notification();

		notification.setToUserSeq(payload.getUserSeq2());
		notification.setFromUserSeq(payload.getUserSeq1());
		switch (payload.getType()) {
		case  "requested":
			notification.setType("friend_requested");
			notification.setMessage("님이 회원님과 친구되고 싶어합니다..");
			break;
		case  "accepted":
			notification.setType("friend_accepted");
			notification.setMessage("님이 회원님과 친구가 되었습니다.");
			break;
		case  "rejected":
			notification.setType("friend_rejected");
			notification.setMessage("님이 회원님의 친구 요청을 거절했습니다.");
			break;
		}
		notification.setIsRead(false);

		if (StringUtils.isNotBlank( payload.getIp() )) {
			notification.setCrtIp( payload.getIp() );
			notification.setUdtIp( payload.getIp() );
		}

		notification.setCrtDt( LocalDateTime.now() );
		notification.setUdtDt( LocalDateTime.now() );

		notification.setCrtSeq( payload.getUserSeq1() );
		notification.setUdtSeq( payload.getUserSeq1() );

		return notification;
	}
}

