package com.example.fileservice.model;

import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@Alias("fileMaster")
@Builder
public class FileMaster {

	/** 순번 */
	private Long seq;

	/** 파일 종류 (profile, image_single, image_multi, video 등) */
	private String fileType;

	/** 설명 */
	private String description;

	private LocalDateTime crtDt;
	private String crtIp;
	private Long crtSeq;
	private LocalDateTime udtDt;
	private String udtIp;
	private Long udtSeq;
}
