package com.example.fileservice.service;

import com.example.fileservice.model.FileMaster;
import com.example.fileservice.model.StreamResult;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	FileMaster uploadProfileImage(MultipartFile file, Long fileMasterSeq, String ip, Long userSeq) throws Exception;
	FileMaster uploadPosting(MultipartFile file, Long fileMasterSeq, String fileType, String ip, Long userSeq) throws Exception;

	byte[] imageContent(Long seq);
	byte[] imageContentProfileByUserSeq(Long userSeq);


	/**
	 * Stream video bytes with HTTP Range support.
	 * @param seq file master sequence
	 * @param rangeHeader raw Range header value, e.g. "bytes=0-"
	 * @return StreamResult containing headers, status and data supplier
	 */
	StreamResult streamVideo(Long seq, String rangeHeader);
}
