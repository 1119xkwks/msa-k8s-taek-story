package com.example.fileservice.controller;

import com.example.fileservice.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {

	private final FileStorageService storageService;

	@GetMapping("/test")
	public String test() {
		log.info("[test] /test");
		log.debug("[test]debug /test");
		return "test";
	}

	@PostMapping(value = "/upload/profile", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadProfile(@RequestPart("file") MultipartFile file) throws Exception {
		log.info("[uploadProfile] file : {}", file);
		String objectName = storageService.uploadProfileImage(file);
		return ResponseEntity.ok(objectName);
	}

}
