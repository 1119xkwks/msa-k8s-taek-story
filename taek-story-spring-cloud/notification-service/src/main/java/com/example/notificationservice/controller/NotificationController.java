package com.example.notificationservice.controller;

import com.example.notificationservice.model.Users;
import com.example.notificationservice.service.NotificationService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping("/all")
	public ResponseEntity<?> allNotifications(HttpSession session, String searchWord) {
		log.info("[allNotifications] session ID : {}", session.getId());

		Users loggedIn = Users.parseLoggedInfo(session);

		return ResponseEntity.ok(notificationService.allNotifications(loggedIn, searchWord));
	}

	@GetMapping("/read/{seq}")
	public ResponseEntity<?> readBySeq(HttpSession session, @PathVariable Long seq) {
		log.info("[readBySeq] session ID : {}", session.getId());

		notificationService.readBySeq(seq);

		return ResponseEntity.ok(1);
	}

	@GetMapping("/read/all")
	public ResponseEntity<?> readAll(HttpSession session) {
		log.info("[readAll] session ID : {}", session.getId());

		Users loggedIn = Users.parseLoggedInfo(session);

		notificationService.readAll(loggedIn);

		return ResponseEntity.ok(1);
	}
}
