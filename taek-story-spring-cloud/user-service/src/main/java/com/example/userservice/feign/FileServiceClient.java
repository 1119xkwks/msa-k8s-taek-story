package com.example.userservice.feign;

import com.example.userservice.model.FileMaster;
import com.example.userservice.config.FeignMultipartSupportConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Component
@FeignClient(name = "file-service", url = "${file.service.base-url}", configuration = FeignMultipartSupportConfig.class)
public interface FileServiceClient {

	@PostMapping(value = "/file/upload/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	FileMaster uploadFile(
			@RequestPart("file") MultipartFile file,
			@RequestParam(value = "fileMasterSeq", required = false) Integer fileMasterSeq,
			@RequestParam("ip") String ip,
			@RequestParam("userSeq") Integer userSeq
	);

}

