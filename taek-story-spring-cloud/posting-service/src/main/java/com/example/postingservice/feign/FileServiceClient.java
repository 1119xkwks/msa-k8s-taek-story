package com.example.postingservice.feign;

import com.example.postingservice.config.FeignMultipartSupportConfig;
import com.example.postingservice.model.FileMaster;
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

	@PostMapping(value = "/file/upload/posting", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	FileMaster uploadFilePosting(
			@RequestPart("file") MultipartFile file,
			@RequestParam(value = "fileMasterSeq", required = false) Long fileMasterSeq,
			@RequestParam("fileType") String fileType,
			@RequestParam("ip") String ip,
			@RequestParam("userSeq") Long userSeq
	);

}

