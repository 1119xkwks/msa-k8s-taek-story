package com.example.userservice.controller;

import com.example.userservice.mapper.UsersMapper;
import com.example.userservice.model.UsersInsert;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UsersMapper usersMapper;

    @PostMapping
    public ResponseEntity<?> signUp(@Valid @RequestBody UsersInsert request) {
		log.info("signUp {}", request);

        // 이메일 중복 체크
        if (usersMapper.countByEmail(request.getEmail()) > 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("email already exists");
        }

        int inserted = usersMapper.insert(request);
        log.info("users inserted: {} email:{}", inserted, request.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}


