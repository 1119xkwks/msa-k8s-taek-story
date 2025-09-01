package com.example.userservice.service;

import com.example.userservice.mapper.FriendMapper;
import com.example.userservice.kafka.UserEventProducer;
import com.example.userservice.model.FriendRequestPayload;
import com.example.userservice.model.FriendUser;
import com.example.userservice.model.Friends;
import com.example.userservice.model.Users;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl  implements FriendService {

	private final FriendMapper friendMapper;
	private final UserEventProducer userEventProducer;

	@Override
	public List<Friends> friendsByUserSeq(Long userSeq) {
		return friendMapper.friendsByUserSeq( userSeq );
	}

	@Override
	public List<Long> friendUserSeqsByUserSeq(Long userSeq) {
		log.debug("[friendUserSeqsByUserSeq] userSeq: {}", userSeq);
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
		if (insertCnt > 0) {
			FriendRequestPayload payload = FriendRequestPayload.builder()
					.key( UUID.randomUUID().toString() )
					.type( "requested" )
					.userSeq1( loggedIn.getSeq() )
					.userSeq2( userSeq )
					.ip( ip )
					.build();
			userEventProducer.sendFriendRequested(payload);
		}
		return 1;
	}

	@Override
	public int accept(HttpSession session, String ip, Long userSeq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		int udpateCnt = friendMapper.accept(loggedIn.getSeq(), userSeq, ip);
		if (udpateCnt > 0) {
			FriendRequestPayload payload = FriendRequestPayload.builder()
					.key( UUID.randomUUID().toString() )
					.type( "accepted" )
					.userSeq1( loggedIn.getSeq() )
					.userSeq2( userSeq )
					.ip( ip )
					.build();
			userEventProducer.sendFriendRequested(payload);
		}
		return 1;
	}

	@Override
	public int reject(HttpSession session, String ip, Long userSeq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null || loggedIn.getSeq() == null) {
			throw new RuntimeException("사용자 정보 없음.");
		}
		int udpateCnt = friendMapper.reject(loggedIn.getSeq(), userSeq, ip);
		if (udpateCnt > 0) {
			FriendRequestPayload payload = FriendRequestPayload.builder()
					.key( UUID.randomUUID().toString() )
					.type( "rejected" )
					.userSeq1( loggedIn.getSeq() )
					.userSeq2( userSeq )
					.ip( ip )
					.build();
			userEventProducer.sendFriendRequested(payload);
		}
		return 1;
	}
}