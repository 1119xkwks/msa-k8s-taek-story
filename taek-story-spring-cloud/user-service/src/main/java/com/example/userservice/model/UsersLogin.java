package com.example.userservice.model;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.ibatis.type.Alias;

/**
 * 사용자 DTO
 */
@Getter
@Setter
@ToString
@Alias("usersLogin")
public class UsersLogin {

	/** 이메일 */
	@NotBlank(message = "이메일을 입력하세요.")
	private String email;

	/** 비밀번호 */
	@NotBlank(message = "비밀번호 입력하세요.")
	private String pw;
}
