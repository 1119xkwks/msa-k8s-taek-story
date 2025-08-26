package com.example.fileservice.model;

import lombok.Builder;
import lombok.Getter;

import java.io.InputStream;

@Getter
@Builder
public class StreamResult {
	private final InputStream inputStream;
	private final long start;
	private final long end;
	private final long total;
	private final long contentLength;
	private final String contentType;
	private final boolean partial;
}


