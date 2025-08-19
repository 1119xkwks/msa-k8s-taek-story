package com.example.postingservice.controller;

import com.example.postingservice.mapper.TimeMapper;
import com.example.postingservice.service.PostingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/posting")
public class PostingController {
    private final PostingService postingService;

    @GetMapping("/test")
    public String test() {
        log.info("[test]");
        return "test";
    }
}
