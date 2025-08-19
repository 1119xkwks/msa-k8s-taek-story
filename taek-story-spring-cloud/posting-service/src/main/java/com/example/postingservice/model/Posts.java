package com.example.postingservice.model;

import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 글쓰기 DTO
 */
@Getter
@Setter
@ToString
@Alias("posts")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Posts {

	/** 순번 (자동 증가, PK) */
	private Integer seq;

	/** 글쓴이 seq */
	private Integer userSeq;

	/** 내용 */
	private String contents;

	/** 내용 종류 */
	private String contentsType;

	/** 첨부파일 순번 */
	private Integer contentsFileSeq;

	/** 감정 선택 */
	private String selectedFeeling;

	/** 생성일 */
	private LocalDateTime crtDt;

	/** 생성 IP */
	private String crtIp;

	/** 생성자 seq */
	private Integer crtSeq;

	/** 수정일 */
	private LocalDateTime udtDt;

	/** 수정 IP */
	private String udtIp;

	/** 수정자 seq */
	private Integer udtSeq;

	public static Posts ofRequests(Users loggedIn, String ip, String activeAction, String selectedFeeling, String contents, FileMaster fileMaster) {
		Posts posts = new Posts();
		if (loggedIn != null) {
			posts.setUserSeq( loggedIn.getSeq() );
			posts.setCrtSeq( loggedIn.getSeq() );
			posts.setUdtSeq( loggedIn.getSeq() );
		}
		if (StringUtils.isNotBlank(ip)) {
			posts.setCrtIp( ip );
			posts.setUdtIp( ip );
		}
		if (StringUtils.isNotBlank(activeAction)) {
			posts.setContentsType( activeAction );
		}
		if (StringUtils.isNotBlank(selectedFeeling)) {
			posts.setSelectedFeeling( selectedFeeling );
		}
		if (StringUtils.isNotBlank(contents)) {
			posts.setContents( contents );
		}
		if (fileMaster != null) {
			posts.setContentsFileSeq( fileMaster.getSeq() );
		}
		return posts;
	}
}


