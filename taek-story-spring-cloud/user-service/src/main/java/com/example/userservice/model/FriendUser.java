package com.example.userservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.servlet.http.HttpSession;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.type.Alias;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * 사용자 DTO
 */
@Slf4j
@Getter
@Setter
@ToString
@Alias("friendUser")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendUser {

	/** 순번 (자동 증가, PK) */
	private Long seq;

	/** 이메일 */
	private String email;

	/** 닉네임 */
	private String nickname;

	/** 생일 */
	private LocalDate birth;

	/** 핸드폰번호 */
	private String phone;

	/** 프로필 파일 마스터번호 */
	private Long fileProfileSeq;

	/** 프로필 파일 상태 */
	private String fileProfileStatus;

	/** 친구 여부 */
	private String friendStatus;


	private LocalDateTime crtDt;
	private String crtIp;
	private Long crtSeq;
	private LocalDateTime udtDt;
	private String udtIp;
	private Long udtSeq;
}
