package com.example.postingservice.mapper;

import com.example.postingservice.model.Posts;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Mapper
public interface PostingMapper {
    int insertPosts(Posts posts);

	List<Posts> selectPages(Long userSeq, Pageable pageable);
	int countPages(Long userSeq, Pageable pageable);
}


