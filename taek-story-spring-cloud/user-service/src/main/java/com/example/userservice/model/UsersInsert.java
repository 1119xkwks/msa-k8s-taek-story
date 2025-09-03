package com.example.userservice.model;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 사용자 DTO
 */
@Getter
@Setter
@ToString
@Alias("usersInsert")
public class UsersInsert {

	private Long seq;

	/** 이메일 */
	@NotBlank(message = "이메일을 입력하세요.")
	@Email(message = "이메일 형식이 올바르지 않습니다.")
	@Size(max = 100, message = "이메일을 최대 100자까지 가능합니다.")
	private String email;

	/** 비밀번호 */
	@NotBlank(message = "비밀번호 입력하세요.")
	@Size(max = 50, message = "비밀번호는 최대 50자까지 가능합니다.")
	private String pw;

	/** 비밀번호 */
	@NotBlank(message = "패스워드 확인을 입력하세요.")
	private String pwChk;

	/** 닉네임 */
	@NotBlank(message = "닉네임을 입력하세요.")
	@Size(max = 25, message = "닉네임은 최대 25자까지 가능합니다.")
	private String nickname;

	/** 생일 */
	@NotNull(message = "생일을 입력하세요.")
	private LocalDate birth;

	/** 핸드폰번호 */
	@NotBlank(message = "핸드폰번호를 입력하세요.")
	@Pattern(regexp = "\\d+", message = "핸드폰번호는 숫자만 입력 가능합니다.")
	private String phone;

	// password와 passwordCheck가 일치하는지 검사
	@AssertTrue(message = "비밀번호와 비밀번호 확인이 일치하지 않습니다.")
	public boolean isPasswordMatching() {
		if (StringUtils.isAnyBlank(pw, pwChk)) {
			return false;
		}
		return Objects.equals(pw, pwChk);
	}

	/** 프로필 파일 마스터번호 */
	private Integer fileProfileSeq;

	/** 프로필 파일 상태 */
	private String fileProfileStatus;


	private LocalDateTime crtDt;
	private String crtIp;
	private Long crtSeq;
	private LocalDateTime udtDt;
	private String udtIp;
	private Long udtSeq;
}
