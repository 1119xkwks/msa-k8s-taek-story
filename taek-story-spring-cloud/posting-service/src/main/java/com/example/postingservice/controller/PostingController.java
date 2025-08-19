package com.example.postingservice.controller;

import com.example.postingservice.common.CommonUtil;
import com.example.postingservice.mapper.TimeMapper;
import com.example.postingservice.model.Posts;
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

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(HttpSession session
			, HttpServletRequest req
			, @RequestPart("activeAction") String activeAction
			, @RequestPart("contents") String contents
			, @RequestPart(value = "file", required = false) MultipartFile file
			, @RequestPart(value = "selectedFeeling", required = false) String selectedFeeling
			) {
        log.info("[save] session ID : {}", session.getId());

		Users loggedIn = Users.parseLoggedInfo(session);
		String ip = CommonUtil.getClientIp(req);

        log.info("[save] loggedIn : {}", loggedIn);
        log.info("[save] ip : {}", ip);
        log.info("[save] file : {}", file);
        log.info("[save] activeAction : {}", activeAction);
        log.info("[save] selectedFeeling : {}", selectedFeeling);
        log.info("[save] contents : {}", contents);

		postingService.savePosting(loggedIn, ip, file, activeAction, selectedFeeling, contents);

		return ResponseEntity.ok(1);
    }
}
