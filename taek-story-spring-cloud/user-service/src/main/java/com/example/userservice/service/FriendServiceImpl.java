package com.example.userservice.service;

import com.example.userservice.mapper.FriendMapper;
import com.example.userservice.model.Friends;
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
}