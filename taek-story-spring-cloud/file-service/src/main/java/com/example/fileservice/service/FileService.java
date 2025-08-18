package com.example.fileservice.service;

import com.example.fileservice.model.FileMaster;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	public FileMaster uploadProfileImage(MultipartFile file, Integer fileMasterSeq, String ip, Integer userSeq) throws Exception;

	public byte[] viewProfile(Integer seq);
}
