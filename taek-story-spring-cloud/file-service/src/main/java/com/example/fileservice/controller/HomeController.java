package com.example.fileservice.controller;

import com.example.fileservice.mapper.HomeMapper;
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
	private final HomeMapper homeMapper;

	@GetMapping("/test")
	public String test() {
		String now = homeMapper.selectNow();
		log.info("[test] db now: {}", now);
		return now;
	}
}
