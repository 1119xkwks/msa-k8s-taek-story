package com.example.userservice.service;

import com.example.userservice.model.Users;
import com.example.userservice.model.UsersInsert;
import com.example.userservice.model.UsersLogin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

	ResponseEntity<?> signUp(HttpServletRequest req, UsersInsert insertForm);

	ResponseEntity<?> login(HttpSession session, UsersLogin request);

	Object me(HttpSession session);
	Users basicInfo(HttpSession session, Long seq);
	Users basicInfoAuth(Long seq);

	ResponseEntity<?> signOut(HttpSession session);

	Object profileSave(HttpSession session, HttpServletRequest req, MultipartFile file);

}


