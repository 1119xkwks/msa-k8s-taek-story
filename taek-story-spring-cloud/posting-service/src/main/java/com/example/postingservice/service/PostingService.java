package com.example.postingservice.service;

import com.example.postingservice.model.Posts;
import com.example.postingservice.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PostingService {
	int savePosting(Users loggedIn, String ip, MultipartFile file, String activeAction, String selectedFeeling, String contents);

	Page<Posts> selectPages(Users loggedIn, String ip, Pageable pageable);
}
