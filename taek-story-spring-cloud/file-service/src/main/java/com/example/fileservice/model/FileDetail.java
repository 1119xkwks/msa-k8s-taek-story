package com.example.fileservice.model;

import lombok.Builder;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@Alias("fileDetail")
@Builder
public class FileDetail {

	/** 순번 */
	private Long seq;

	/** 파일 마스터 ID */
	private Long masterSeq;

	/** 원본 파일명 */
	private String fileName;

	/** 저장 경로 */
	private String filePath;

	/** 파일 크기 */
	private Long fileSize;

	/** MIME 타입 */
	private String mimeType;

	/** 생성일 */
	private LocalDateTime crtDt;

	/** 생성 IP */
	private String crtIp;

	/** 생성자 ID */
	private String crtId;

	/** 수정일 */
	private LocalDateTime udtDt;

	/** 수정 IP */
	private String udtIp;

	/** 수정자 ID */
	private String udtId;
}
