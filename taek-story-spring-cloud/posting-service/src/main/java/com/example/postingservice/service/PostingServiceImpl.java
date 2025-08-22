package com.example.postingservice.service;

import com.example.postingservice.feign.FileServiceClient;
import com.example.postingservice.mapper.PostingMapper;
import com.example.postingservice.model.FileMaster;
import com.example.postingservice.model.Posts;
import com.example.postingservice.model.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostingServiceImpl implements PostingService {

	private final FileServiceClient fileServiceClient;
	private final PostingMapper postingMapper;

	@Override
	public int savePosting(Users loggedIn, String ip, MultipartFile file, String activeAction, String selectedFeeling, String contents) {
		log.info("[savePosting] file : {}", file);

		try {

			// 파일 업로드
			FileMaster fileMaster = null;
			if (file != null && !file.isEmpty()) {
				log.info("[savePosting] 파일 업로드!");
				fileMaster = fileServiceClient.uploadFilePosting(file, null, activeAction, ip, loggedIn.getSeq());
			}

			// post 정보 DB 저장
			Posts posting = Posts.ofRequests(loggedIn, ip, activeAction, selectedFeeling, contents, fileMaster);
			int insertCnt = postingMapper.insertPosts(posting);

			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public Page<Posts> selectPages(Users loggedIn, String ip, Pageable pageable) {
		if (loggedIn == null) {
			log.debug("[selectPages] user is null");
			return new PageImpl<Posts>(new ArrayList<>(), pageable, 0);
		}
		List<Posts> list = postingMapper.selectPages(loggedIn.getSeq(), pageable);
		int total = postingMapper.countPages(loggedIn.getSeq(), pageable);
		return new PageImpl<Posts>(list, pageable, total);
	}
}
