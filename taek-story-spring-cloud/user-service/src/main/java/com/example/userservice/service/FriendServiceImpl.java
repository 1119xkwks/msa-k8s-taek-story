package com.example.userservice.service;

import com.example.userservice.mapper.FriendMapper;
import com.example.userservice.model.FriendUser;
import com.example.userservice.model.Friends;
import com.example.userservice.model.Users;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl  implements FriendService {

	private final FriendMapper friendMapper;

	@Override
	public List<Friends> friendsByUserSeq(Long userSeq) {
		return friendMapper.friendsByUserSeq( userSeq );
	}

	@Override
	public List<Long> friendUserSeqsByUserSeq(Long userSeq) {
		return friendMapper.friendUserSeqsByUserSeq( userSeq );
	}

	@Override
	public List<FriendUser> friends(HttpSession session) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		return friendMapper.friends(loggedIn.getSeq());
	}

	@Override
	public List<FriendUser> search(HttpSession session, String keyword) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		return friendMapper.search(loggedIn.getSeq(), keyword);
	}

	@Override
	public int request(HttpSession session, String ip, Long userSeq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		int insertCnt = friendMapper.request(loggedIn.getSeq(), userSeq, ip);
		return 1;
	}

	@Override
	public int accept(HttpSession session, String ip, Long userSeq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		int insertCnt = friendMapper.accept(loggedIn.getSeq(), userSeq, ip);
		return 1;
	}

	@Override
	public int reject(HttpSession session, String ip, Long userSeq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		int insertCnt = friendMapper.reject(loggedIn.getSeq(), userSeq, ip);
		return 1;
	}
}