package com.example.postingservice.service;

import com.example.postingservice.model.Users;
import org.springframework.web.multipart.MultipartFile;

public interface PostingService {
	int savePosting(Users loggedIn, String ip, MultipartFile file, String activeAction, String selectedFeeling, String contents);
}
