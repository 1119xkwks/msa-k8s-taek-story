package com.example.userservice.controller;

import com.example.userservice.model.Friends;
import com.example.userservice.service.FriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
