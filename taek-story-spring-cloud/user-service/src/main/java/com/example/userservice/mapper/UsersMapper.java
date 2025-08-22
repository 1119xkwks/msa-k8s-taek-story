package com.example.userservice.mapper;

import com.example.userservice.model.Users;
import com.example.userservice.model.UsersInsert;
import com.example.userservice.model.UsersLogin;
import jakarta.validation.Valid;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UsersMapper {

    int insert(UsersInsert usersInsert);

    int countByEmail(@Param("email") String email);

	Users selectByLogin(@Valid UsersLogin usersLogin);

	int updateProfile(Users users);

	Users selectBasicUserInfoBySeq(Long seq);
}


