package com.example.userservice.model;

import lombok.*;

import java.time.LocalDate;

/**
 * 사용자 DTO
 */
@Getter
@Setter
@ToString
public class Users {

	/** 순번 (자동 증가, PK) */
	private Integer seq;

	/** 이메일 */
	private String email;

	/** 비밀번호 */
	private String password;

	/** 닉네임 */
	private String nickname;

	/** 생일 */
	private LocalDate birth;

	/** 핸드폰번호 */
	private String phone;
}
