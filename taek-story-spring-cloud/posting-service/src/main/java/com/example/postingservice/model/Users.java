package com.example.postingservice.model;

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
@Alias("users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {

	/** 순번 (자동 증가, PK) */
	private Long seq;

	/** 이메일 */
	private String email;

	/** 비밀번호 */
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String pw;

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

	private LocalDateTime crtDt;
	private String crtIp;
	private Long crtSeq;
	private LocalDateTime udtDt;
	private String udtIp;
	private Long udtSeq;

	public static Users parseLoggedInfo(HttpSession session) {
		Object value = session.getAttribute("logged:user");
		log.info("[parseLoggedInfo] session value : {}", value);
		if (value == null) {
			return null;
		}
		if (value instanceof Users) {
			return (Users) value;
		}
		if (value instanceof Map<?,?>) {
			Map<?, ?> map = (Map<?, ?>) value;
			Users user = Users.builder()
					.seq(toLong(map.get("seq")))
					.email(toStringOrNull(map.get("email")))
					.nickname(toStringOrNull(map.get("nickname")))
					.birth(toLocalDate(map.get("birth")))
					.phone(toStringOrNull(map.get("phone")))
					.fileProfileSeq(toLong(map.get("fileProfileSeq")))
					.fileProfileStatus(toStringOrNull(map.get("fileProfileStatus")))
					.crtDt(toLocalDateTime(map.get("crtDt")))
					.crtIp(toStringOrNull(map.get("crtIp")))
					.crtSeq(toLong(map.get("crtSeq")))
					.udtDt(toLocalDateTime(map.get("udtDt")))
					.udtIp(toStringOrNull(map.get("udtIp")))
					.udtSeq(toLong(map.get("udtSeq")))
					.build();
			return user;
		}
		return null;
	}

	private static Integer toInteger(Object obj) {
		if (obj == null) return null;
		if (obj instanceof Number) return ((Number) obj).intValue();
		try {
			return Integer.parseInt(obj.toString());
		} catch (NumberFormatException e) {
			return null;
		}
	}

	private static Long toLong(Object obj) {
		if (obj == null) return null;
		if (obj instanceof Number) return ((Number) obj).longValue();
		try {
			return Long.parseLong(obj.toString());
		} catch (NumberFormatException e) {
			return null;
		}
	}

	private static String toStringOrNull(Object obj) {
		return obj == null ? null : obj.toString();
	}

	private static LocalDate toLocalDate(Object obj) {
		if (obj == null) return null;
		String s = obj.toString();
		if (s.isEmpty()) return null;
		try {
			return LocalDate.parse(s);
		} catch (Exception e) {
			return null;
		}
	}

	private static LocalDateTime toLocalDateTime(Object obj) {
		if (obj == null) return null;
		String s = obj.toString();
		if (s.isEmpty()) return null;
		try {
			return LocalDateTime.parse(s);
		} catch (Exception e) {
			return null;
		}
	}
}
