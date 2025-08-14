package com.example.fileservice.config;

import io.minio.MinioClient;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "minio")
public class MinioConfig {
	private String endpoint;
	private String accessKey;
	private String secretKey;

	public void setEndpoint(String endpoint) { this.endpoint = endpoint; }
	public void setAccessKey(String accessKey) { this.accessKey = accessKey; }
	public void setSecretKey(String secretKey) { this.secretKey = secretKey; }

	@Bean
	public MinioClient minioClient() {
		return MinioClient.builder()
				.endpoint(endpoint)
				.credentials(accessKey, secretKey)
				.build();
	}
}