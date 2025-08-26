package com.example.userservice.service;

import com.example.userservice.common.CommonUtil;
import com.example.userservice.feign.FileServiceClient;
import com.example.userservice.mapper.UsersMapper;
import com.example.userservice.model.FileMaster;
import com.example.userservice.model.Users;
import com.example.userservice.model.UsersInsert;
import com.example.userservice.model.UsersLogin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

	private final UsersMapper usersMapper;
	private final FileServiceClient fileServiceClient;

	@Override
	public ResponseEntity<?> signUp(HttpServletRequest req, UsersInsert insertForm) {
		String ip = CommonUtil.getClientIp(req);
		insertForm.setCrtIp(ip);
		insertForm.setUdtIp(ip);

		log.info("signUp {}", insertForm);

		if (usersMapper.countByEmail(insertForm.getEmail()) > 0) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exists");
		}

		int inserted = usersMapper.insert(insertForm);
		log.info("users inserted: {} email:{}", inserted, insertForm.getEmail());
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@Override
	public ResponseEntity<?> login(HttpSession session, UsersLogin request) {
		log.info("[login] login {}", request);
		log.info("[login] session ID {}", session.getId());

		Users loggedIn = usersMapper.selectByLogin(request);
		log.info("[login] loggedIn : {}", loggedIn);

		if (loggedIn == null) {
			return ResponseEntity.ok(0);
		}
		session.setAttribute("logged:user", loggedIn);
		return ResponseEntity.ok(1);
	}

	@Override
	public Object me(HttpSession session) {
		log.info("[me] session ID {}", session.getId());
		Object value = session.getAttribute("logged:user");
		log.info("[me] value {}", value);
		return value;
	}

	@Override
	public Users basicInfo(HttpSession session, Long seq) {
		Users loggedIn = Users.parseLoggedInfo(session);
		if (loggedIn == null) {
			return null;
		}
		return usersMapper.selectBasicUserInfoBySeq(seq);
	}

	@Override
	public Users basicInfoAuth(Long seq) {
		return usersMapper.selectBasicUserInfoBySeq(seq);
	}

	@Override
	public ResponseEntity<?> signOut(HttpSession session) {
		log.info("[signOut] session ID {}", session.getId());
		Object value = session.getAttribute("logged:user");
		log.info("[signOut] value {}", value);
		try {
			session.invalidate();
		} catch (IllegalStateException ignored) {
		}
		return ResponseEntity.ok(1);
	}

	@Override
	public Object profileSave(HttpSession session, HttpServletRequest req, MultipartFile file) {
		try {
			log.info("[profileSave] session ID {}", session.getId());

			String ip = CommonUtil.getClientIp(req);
			Users loggedIn = Users.parseLoggedInfo(session);

			log.info("[profileSave] loggedIn {}", loggedIn);

			// Call Feign Client
			FileMaster fileMaster = fileServiceClient.uploadFileProfile(file, loggedIn.getFileProfileSeq(), ip, loggedIn.getSeq());

			// DB 프로필 상태 업데이트
			loggedIn.setFileProfileSeq(fileMaster.getSeq());
			loggedIn.setFileProfileStatus("UPLOADED");
			usersMapper.updateProfile( loggedIn );

			// 세션 정보 프로필 업데이트
			session.setAttribute("logged:user", loggedIn);

			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

}


