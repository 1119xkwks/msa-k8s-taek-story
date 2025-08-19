package com.example.postingservice.controller;

import com.example.postingservice.common.CommonUtil;
import com.example.postingservice.mapper.TimeMapper;
import com.example.postingservice.model.Users;
import com.example.postingservice.service.PostingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/posting")
public class PostingController {
    private final PostingService postingService;

    @PostMapping(value = "/insert", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> insert(HttpSession session
			, HttpServletRequest req
			, @RequestPart("activeAction") String activeAction
			, @RequestPart("contents") String contents
			, @RequestPart(value = "file", required = false) MultipartFile file
			, @RequestPart(value = "selectedFeeling", required = false) String selectedFeeling
			) {
        log.info("[insert] session ID : {}", session.getId());

		String ip = CommonUtil.getClientIp(req);
		Users loggedIn = Users.parseLoggedInfo(session);

        log.info("[insert] ip : {}", ip);
        log.info("[insert] loggedIn : {}", loggedIn);
        log.info("[insert] file : {}", file);
        log.info("[insert] activeAction : {}", activeAction);
        log.info("[insert] selectedFeeling : {}", selectedFeeling);
        log.info("[insert] contents : {}", contents);

		return ResponseEntity.ok(1);
    }
}
