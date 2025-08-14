package com.example.fileservice.service;

import com.example.fileservice.mapper.FileMapper;
import com.example.fileservice.model.FileDetail;
import com.example.fileservice.model.FileMaster;
import io.minio.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {
	private final MinioClient minio;
	@Value("${minio.bucket.images}")
	private String imagesBucket;

	private final FileMapper fileMapper;

	@Override
	public String uploadProfileImage(MultipartFile file) throws Exception {

		// MinIO 저장
		log.debug("[uploadProfileImage] imagesBucket : {}", imagesBucket);
		ensureBucket(imagesBucket);

		// file 분석
		// 원본 파일명
		String originalFilename = file.getOriginalFilename();

		// MIME 타입
		String contentType = file.getContentType();

		// 파일 크기 (bytes)
		long fileSize = file.getSize();

		// 날짜 폴더
		String yyyyMmDd = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));

		// 확장자명
		String ext = StringUtils.substringAfterLast(originalFilename, ".");

		String objectName = "/profile/" + yyyyMmDd + "/" + UUID.randomUUID();
		if (StringUtils.isNotBlank(ext)) {
			objectName += "." + ext;
		}
		log.debug("[uploadProfileImage] objectName : {}", objectName);

		ObjectWriteResponse owr = minio.putObject(
				PutObjectArgs.builder()
						.bucket(imagesBucket)
						.object(objectName)
						.contentType("image/jpeg")
						.stream(file.getInputStream(), fileSize, -1)
						.build()
		);
		log.debug("[uploadProfileImage] ObjectWriteResponse : {}", owr);

		// DB Insert
		FileMaster fileMaster = FileMaster.builder()
				.fileType("profile")
				.build();
		fileMapper.insertFileMaster(fileMaster);
		log.debug("[uploadProfileImage] inserted fileMaster : {}", fileMaster);

		FileDetail  fileDetail = FileDetail.builder()
				.masterSeq( fileMaster.getSeq() )
				.fileName(originalFilename)
				.filePath(objectName)
				.fileSize(fileSize)
				.mimeType(contentType)
				.build();
		fileMapper.insertFileDetail(fileDetail);
		log.debug("[uploadProfileImage] inserted fileDetail : {}", fileDetail);

		return objectName;
	}

	private void ensureBucket(String bucket) throws Exception {
		boolean exists = minio.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
		if (!exists) {
			minio.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
		}
	}
}
