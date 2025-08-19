package com.example.postingservice.mapper;

import com.example.postingservice.model.Posts;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostingMapper {
    int insertPosts(Posts posts);
}


