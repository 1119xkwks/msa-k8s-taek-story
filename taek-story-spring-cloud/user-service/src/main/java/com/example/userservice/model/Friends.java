package com.example.userservice.model;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@Alias("friends")
public class Friends {

	// 사용자 정보
	private Long user1Seq;     // 사용자1 순번
	private Long user2Seq;     // 사용자2 순번
	private String status;     // 친구 상태 (요청, 수락, 차단 등)

	// 등록 정보
	private LocalDateTime crtDt;   // 생성일시
	private String crtIp;          // 생성 IP
	private Long crtSeq;           // 생성자 순번

	// 수정 정보
	private LocalDateTime udtDt;   // 수정일시
	private String udtIp;          // 수정 IP
	private Long udtSeq;           // 수정자 순번
}
