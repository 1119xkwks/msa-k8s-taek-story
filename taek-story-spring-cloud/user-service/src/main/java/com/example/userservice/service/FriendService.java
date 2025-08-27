package com.example.userservice.service;

import com.example.userservice.model.FriendUser;
import com.example.userservice.model.Friends;
import com.example.userservice.model.Users;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FriendService {
	List<Friends> friendsByUserSeq(Long userSeq);

	List<Long> friendUserSeqsByUserSeq(Long userSeq);

	List<FriendUser> friends(HttpSession session);
	List<FriendUser> search(HttpSession session, String keyword);

	int request(HttpSession session, String ip, Long userSeq);

	int accept(HttpSession session, String ip, Long userSeq);

	int reject(HttpSession session, String ip, Long userSeq);
}
