package com.example.fileservice.service;

import com.example.fileservice.model.FileMaster;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	FileMaster uploadProfileImage(MultipartFile file, Long fileMasterSeq, String ip, Long userSeq) throws Exception;
	FileMaster uploadPosting(MultipartFile file, Long fileMasterSeq, String fileType, String ip, Long userSeq) throws Exception;

	byte[] imageContent(Long seq);

	String getVideoPresignedUri(Long seq);
}
