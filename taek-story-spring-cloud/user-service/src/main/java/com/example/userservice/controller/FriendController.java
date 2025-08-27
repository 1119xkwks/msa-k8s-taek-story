package com.example.userservice.controller;

import com.example.userservice.common.CommonUtil;
import com.example.userservice.model.FriendUser;
import com.example.userservice.model.Friends;
import com.example.userservice.model.Users;
import com.example.userservice.service.FriendService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/friend")
public class FriendController {

	private final FriendService friendService;

    @GetMapping("/friends-by-user-seq/{userSeq}")
    public ResponseEntity<List<Friends>> friendsByUserSeq(@PathVariable Long userSeq) {
        log.info("[friendsByUserSeq] userSeq : {}", userSeq);
		return ResponseEntity.ok( friendService.friendsByUserSeq(userSeq) );
    }

	@GetMapping("/friend-user-seqs-by-user-seq/{userSeq}")
	public ResponseEntity<List<Long>> friendUserSeqsByUserSeq(@PathVariable Long userSeq) {
		log.info("[friendUserSeqsByUserSeq] userSeq : {}", userSeq);
		return ResponseEntity.ok( friendService.friendUserSeqsByUserSeq(userSeq) );
	}

	// 친구 목록
	@GetMapping("/friends")
	public ResponseEntity<List<FriendUser>> friends(HttpSession session) {
		return ResponseEntity.ok(friendService.friends(session));
	}

	// 친구찾기
	@GetMapping("/search")
	public ResponseEntity<List<FriendUser>> search(HttpSession session, String keyword) {
		return ResponseEntity.ok(friendService.search(session, keyword));
	}

	// 친구요청
	@GetMapping("/request/{userSeq}")
	public ResponseEntity<?> request(HttpSession session, HttpServletRequest req, @PathVariable Long userSeq) {
		String ip = CommonUtil.getClientIp(req);
		friendService.request(session, ip, userSeq);
		return ResponseEntity.ok(1);
	}

	// 친구수락
	@GetMapping("/accept/{userSeq}")
	public ResponseEntity<?> accept(HttpSession session, HttpServletRequest req, @PathVariable Long userSeq) {
		String ip = CommonUtil.getClientIp(req);
		friendService.accept(session, ip, userSeq);
		return ResponseEntity.ok(1);
	}

	// 친구요청거절
	@GetMapping("/reject/{userSeq}")
	public ResponseEntity<?> reject(HttpSession session, HttpServletRequest req, @PathVariable Long userSeq) {
		String ip = CommonUtil.getClientIp(req);
		friendService.reject(session, ip, userSeq);
		return ResponseEntity.ok(1);
	}
}
