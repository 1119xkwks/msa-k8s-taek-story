package com.example.userservice.mapper;

import com.example.userservice.model.FriendUser;
import com.example.userservice.model.Friends;
import com.example.userservice.model.Users;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FriendMapper {
	List<Friends> friendsByUserSeq(Long userSeq);

	List<Long> friendUserSeqsByUserSeq(Long userSeq);

	List<FriendUser> friends(Long userSeq);
	List<FriendUser> search(Long userSeq, String keyword);

	int request(Long userSeq1, Long userSeq2, String ip);
	int accept(Long userSeq1, Long userSeq2, String ip);
	int reject(Long userSeq1, Long userSeq2, String ip);
}


