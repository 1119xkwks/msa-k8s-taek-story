package com.example.fileservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				// 특정 호스트만 (http/https, 모든 포트)
				.allowedOriginPatterns(
						"http://localhost:*", "https://localhost:*",
						"http://127.0.0.1:*", "https://127.0.0.1:*",
						"http://*.example.com:*", "https://*.example.com:*"
				)
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true)
				.maxAge(3600);
	}
}