package com.example.userservice.mapper;

import com.example.userservice.model.UsersInsert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UsersMapper {

    int insert(UsersInsert usersInsert);

    int countByEmail(@Param("email") String email);
}


