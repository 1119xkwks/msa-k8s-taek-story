package com.example.fileservice.feign;

import com.example.fileservice.model.Users;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Component
@FeignClient(name = "user-service", url = "${user.service.base-url}")
public interface UserServiceClient {

    @GetMapping("/users/basic-info-no-auth/{userSeq}")
	Users usersBasicInfoByUserSeq(@PathVariable("userSeq") Long userSeq);
}


