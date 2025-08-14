package com.example.fileservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
	public String uploadProfileImage(MultipartFile file) throws Exception;
}
