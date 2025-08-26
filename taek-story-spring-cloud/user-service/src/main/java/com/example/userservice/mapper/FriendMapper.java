package com.example.userservice.mapper;

import com.example.userservice.model.Friends;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FriendMapper {
	List<Friends> friendsByUserSeq(Long userSeq);

	List<Long> friendUserSeqsByUserSeq(Long userSeq);
}


