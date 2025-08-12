package com.example.userservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.ibatis.type.Alias;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 사용자 DTO
 */
@Getter
@Setter
@ToString
@Alias("users")
public class Users {

	/** 순번 (자동 증가, PK) */
	private Integer seq;

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

	private LocalDateTime crtDt;
	private String crtIp;
	private LocalDateTime udtDt;
	private String udtIp;
}
