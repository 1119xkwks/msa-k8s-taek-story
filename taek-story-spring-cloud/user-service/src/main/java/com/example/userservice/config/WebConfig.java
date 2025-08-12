package com.example.userservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:32080",
                        "http://localhost:30090",
                        "http://localhost:20090",
                        "http://localhost:32290",
                        "http://127.0.0.1:5173",
                        "http://127.0.0.1:32080",
                        "http://127.0.0.1:30090",
                        "http://127.0.0.1:20090",
                        "http://127.0.0.1:32290",
						"http://192.168.211.81:5173",
						"http://192.168.211.81:32080",
						"http://192.168.211.81:30090",
						"http://192.168.211.81:20090",
						"http://192.168.211.81:32290"
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}


