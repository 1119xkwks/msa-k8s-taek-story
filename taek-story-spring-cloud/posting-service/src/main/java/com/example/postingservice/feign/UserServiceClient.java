package com.example.postingservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Component
@FeignClient(name = "user-service", url = "${user.service.base-url}")
public interface UserServiceClient {

    @GetMapping("/friend/friend-user-seqs-by-user-seq/{userSeq}")
    List<Long> friendUserSeqsByUserSeq(@PathVariable("userSeq") Long userSeq);
}


