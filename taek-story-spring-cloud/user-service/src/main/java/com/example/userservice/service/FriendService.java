package com.example.userservice.service;

import com.example.userservice.model.Friends;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FriendService {
	List<Friends> friendsByUserSeq(Long userSeq);

	List<Long> friendUserSeqsByUserSeq(Long userSeq);
}
