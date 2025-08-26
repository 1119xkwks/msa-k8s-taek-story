package com.example.fileservice.controller;

import com.example.fileservice.model.FileMaster;
import com.example.fileservice.service.FileService;
import com.example.fileservice.model.StreamResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

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
			, @RequestParam(value = "fileMasterSeq", required = false) Long fileMasterSeq
			, @RequestParam("ip") String ip
			, @RequestParam("userSeq") Long userSeq
	) throws Exception {
		log.info("[uploadProfile] file : {}", file);
		log.info("[uploadProfile] ip : {}", ip);
		log.info("[uploadProfile] userSeq : {}", userSeq);
		FileMaster fileMaster = fileService.uploadProfileImage(file, fileMasterSeq, ip, userSeq);
		return ResponseEntity.ok( fileMaster );
	}

	@PostMapping(value = "/upload/posting", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadPosting(
			@RequestPart("file") MultipartFile file
			, @RequestParam(value = "fileMasterSeq", required = false) Long fileMasterSeq
			, @RequestParam("fileType") String fileType
			, @RequestParam("ip") String ip
			, @RequestParam("userSeq") Long userSeq
	) throws Exception {
		log.info("[uploadPosting] file : {}", file);
		log.info("[uploadPosting] fileType : {}", fileType);
		log.info("[uploadPosting] ip : {}", ip);
		log.info("[uploadPosting] userSeq : {}", userSeq);
		FileMaster fileMaster = fileService.uploadPosting(file, fileMasterSeq, fileType, ip, userSeq);
		return ResponseEntity.ok( fileMaster );
	}

	@GetMapping("/image/content/{seq}")
	public ResponseEntity<byte[]> imageContent(@PathVariable("seq") Long seq) throws Exception {
		log.info("[imageContent] seq : {}", seq);

		byte[] bytes = fileService.imageContent(seq);

		// MIME 타입 설정 (jpg/png 등)
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG); // 필요시 동적으로 mime type 판단

		return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
	}

	// Video streaming with Range support
	@GetMapping("/video/stream/{seq}")
	public ResponseEntity<byte[]> streamVideo(
			@PathVariable("seq") Long seq,
			@RequestHeader(value = "Range", required = false) String range
	) throws Exception {
		log.info("[streamVideo] seq: {}, Range: {}", seq, range);
		StreamResult sr = fileService.streamVideo(seq, range);

		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept-Ranges", "bytes");
		headers.set("Content-Type", sr.getContentType());
		if (sr.isPartial()) {
			headers.set("Content-Range", String.format("bytes %d-%d/%d", sr.getStart(), sr.getEnd(), sr.getTotal()));
		}
		headers.setContentLength(sr.getContentLength());

		try (InputStream is = sr.getInputStream()) {
			byte[] data = is.readAllBytes();
			return new ResponseEntity<>(data, headers, sr.isPartial() ? HttpStatus.PARTIAL_CONTENT : HttpStatus.OK);
		}
	}
}
