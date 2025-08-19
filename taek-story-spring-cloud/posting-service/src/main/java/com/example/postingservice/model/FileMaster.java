package com.example.postingservice.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FileMaster {

	/** 순번 */
	private Integer seq;

	/** 파일 종류 (profile, image_single, image_multi, video 등) */
	private String fileType;

	/** 설명 */
	private String description;

	private LocalDateTime crtDt;
	private String crtIp;
	private Integer crtSeq;
	private LocalDateTime udtDt;
	private String udtIp;
	private Integer udtSeq;
}
