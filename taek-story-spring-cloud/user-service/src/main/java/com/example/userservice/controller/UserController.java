package com.example.userservice.controller;

import com.example.userservice.model.UsersInsert;
import com.example.userservice.model.UsersLogin;
import com.example.userservice.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	// 회원가입
	@PostMapping
	public ResponseEntity<?> signUp(HttpServletRequest req, @Valid @RequestBody UsersInsert insertForm) {
		return userService.signUp(req, insertForm);
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(HttpSession session,
					   @Valid @RequestBody UsersLogin request) {
		return userService.login(session, request);
	}

	// 로그인 정보
	@PostMapping("/me")
	public ResponseEntity<?> me(HttpSession session) {
		return ResponseEntity.ok(userService.me(session));
	}

	// 회원 기본 정보
	@GetMapping("/basic-info/{seq}")
	public ResponseEntity<?> basicInfo(HttpSession session, @PathVariable("seq") Long seq) {
		return ResponseEntity.ok(userService.basicInfo(session, seq));
	}

	// 로그아웃 (세션 제거 -> Redis Spring Session에서 삭제됨)
	@GetMapping("/signout")
	public ResponseEntity<?> signOut(HttpSession session) {
		return userService.signOut(session);
	}

	// 프로필 저장
	@PostMapping("/profile/save")
	public ResponseEntity<?> profileSave(HttpSession session, HttpServletRequest req, @RequestPart("file") MultipartFile file) {
		return ResponseEntity.ok(userService.profileSave(session, req, file));
	}
}


