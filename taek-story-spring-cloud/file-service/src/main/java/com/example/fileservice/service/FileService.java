package com.example.fileservice.service;

import com.example.fileservice.model.FileMaster;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	FileMaster uploadProfileImage(MultipartFile file, Integer fileMasterSeq, String ip, Integer userSeq) throws Exception;
	FileMaster uploadPosting(MultipartFile file, Integer fileMasterSeq, String fileType, String ip, Integer userSeq) throws Exception;

	byte[] viewProfile(Integer seq);

}
