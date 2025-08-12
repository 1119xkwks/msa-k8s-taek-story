package com.example.userservice.controller;

import com.example.userservice.common.CommonUtil;
import com.example.userservice.mapper.UsersMapper;
import com.example.userservice.model.Users;
import com.example.userservice.model.UsersInsert;
import com.example.userservice.model.UsersLogin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UsersMapper usersMapper;
    private final RedisTemplate<String, Object> redisTemplate;

	// 회원가입
    @PostMapping
    public ResponseEntity<?> signUp(HttpServletRequest req, @Valid @RequestBody UsersInsert insertForm) {
		String ip = CommonUtil.getClientIp(req);
		insertForm.setCrtIp(ip);
		insertForm.setUdtIp(ip);

		log.info("signUp {}", insertForm);

        // 이메일 중복 체크
        if (usersMapper.countByEmail(insertForm.getEmail()) > 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("email already exists");
        }

        int inserted = usersMapper.insert(insertForm);
        log.info("users inserted: {} email:{}", inserted, insertForm.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

	// 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(HttpSession session,
								   @Valid @RequestBody UsersLogin request) {
		log.info("[login] login {}", request);
		log.info("[login] session ID {}", session.getId());

		Users loggedIn = usersMapper.selectByLogin(request);
		log.info("[login] loggedIn : {}", loggedIn);

        if (loggedIn == null) {
            return ResponseEntity.ok(0);
        }
        // Spring Session (Redis) 저장: 브라우저별 SESSION 쿠키로 분리
        session.setAttribute("logged:user", loggedIn);
        return ResponseEntity.ok(1);
	}

    // 로그인 정보
    @PostMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
		log.info("[me] session ID {}", session.getId());
        Object value = session.getAttribute("logged:user");
		log.info("[me] value {}", value);
        return ResponseEntity.ok(value);
    }

    // 로그아웃 (세션 제거 -> Redis Spring Session에서 삭제됨)
    @PostMapping("/signout")
    public ResponseEntity<?> signOut(HttpSession session) {
        try {
            session.invalidate();
        } catch (IllegalStateException ignored) {
            // 이미 무효화된 세션
        }
        return ResponseEntity.ok(1);
    }


}


