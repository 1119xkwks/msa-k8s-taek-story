package com.example.fileservice.controller;

import com.example.fileservice.model.FileMaster;
import com.example.fileservice.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {

	private final FileService fileService;

	@GetMapping("/test")
	public String test() {
		log.info("[test] /test");
		log.debug("[test]debug /test");
		return "test";
	}

	@PostMapping(value = "/upload/profile", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfile(
			@RequestPart("file") MultipartFile file
			, @RequestParam(value = "fileMasterSeq", required = false) Integer fileMasterSeq
			, @RequestParam("ip") String ip
			, @RequestParam("userSeq") Integer userSeq
	) throws Exception {
		log.info("[uploadProfile] file : {}", file);
		log.info("[uploadProfile] ip : {}", ip);
		log.info("[uploadProfile] userSeq : {}", userSeq);
		FileMaster fileMaster = fileService.uploadProfileImage(file, fileMasterSeq, ip, userSeq);
		return ResponseEntity.ok( fileMaster );
	}

	@GetMapping("/view/profile/{seq}")
	public ResponseEntity<byte[]> viewProfile(@PathVariable("seq") Integer seq) throws Exception {
		log.info("[viewProfile] seq : {}", seq);

		byte[] bytes = fileService.viewProfile(seq);

		// MIME 타입 설정 (jpg/png 등)
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG); // 필요시 동적으로 mime type 판단

		return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
	}

}
