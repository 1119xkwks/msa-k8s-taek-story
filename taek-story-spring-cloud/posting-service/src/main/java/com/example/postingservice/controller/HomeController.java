package com.example.postingservice.controller;

import com.example.postingservice.mapper.TimeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/")
public class HomeController {
    private final TimeMapper timeMapper;

    @GetMapping("/test")
    public String test() {
        String now = timeMapper.selectNow();
        log.info("db now: {}", now);
        return now;
    }
}
