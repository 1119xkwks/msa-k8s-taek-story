package com.example.fileservice.service;

import com.example.fileservice.mapper.FileMapper;
import com.example.fileservice.model.FileDetail;
import com.example.fileservice.model.FileMaster;
import com.example.fileservice.model.StreamResult;
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
public class FileServiceImpl implements FileService {

	private final MinioClient minioClient;
	@Value("${minio.bucket.images}")
	private String imagesBucket;
	@Value("${minio.bucket.videos}")
	private String videosBucket;

	private final FileMapper fileMapper;

	@Override
	public FileMaster uploadProfileImage(MultipartFile file, Long fileMasterSeq, String ip, Long userSeq) throws Exception {

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

		String objectName = "profile/" + yyyyMmDd + "/" + UUID.randomUUID();
		if (StringUtils.isNotBlank(ext)) {
			objectName += "." + ext;
		}
		log.debug("[uploadProfileImage] objectName : {}", objectName);

		ObjectWriteResponse owr = minioClient.putObject(
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
				.crtIp(ip)
				.crtSeq(userSeq)
				.udtIp(ip)
				.udtSeq(userSeq)
				.build();
		if (fileMasterSeq == null) {
			fileMaster.setDescription("프로필 사진 업로드");
			fileMapper.insertFileMaster(fileMaster);
		} else {
			fileMaster.setDescription("프로필 사진 수정 업로드");
			fileMaster.setSeq(fileMasterSeq);
			fileMapper.updateFileMaster(fileMaster);
			fileMapper.deleteFileDetailByMasterSeq(fileMasterSeq);
		}
		log.debug("[uploadProfileImage] inserted fileMaster : {}", fileMaster);

		FileDetail  fileDetail = FileDetail.builder()
				.masterSeq( fileMaster.getSeq() )
				.fileName(originalFilename)
				.filePath(objectName)
				.fileSize(fileSize)
				.mimeType(contentType)
				.crtIp(ip)
				.crtSeq(userSeq)
				.build();
		fileMapper.insertFileDetail(fileDetail);
		log.debug("[uploadProfileImage] inserted fileDetail : {}", fileDetail);

		return fileMaster;
	}

	@Override
	public FileMaster uploadPosting(MultipartFile file, Long fileMasterSeq, String fileType, String ip, Long userSeq) throws Exception {

		// MinIO 저장
		log.debug("[uploadPosting] requested fileType : {}", fileType);

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

		String bucketName = null;
		switch (fileType) {
			case "video":
				bucketName = videosBucket;
				break;
			case "image":
				bucketName = imagesBucket;
				break;
			default:
				throw new Exception("FILE TYPE NOT SUPPORTED");
		}
		log.debug("[uploadPosting] resolved bucketName : {}", bucketName);
		ensureBucket(bucketName);

		String objectName = "posting/" + yyyyMmDd + "/" + UUID.randomUUID();
		if (StringUtils.isNotBlank(ext)) {
			objectName += "." + ext;
		}
		log.debug("[uploadPosting] objectName : {}", objectName);

		ObjectWriteResponse owr = minioClient.putObject(
				PutObjectArgs.builder()
						.bucket(bucketName)
						.object(objectName)
						.contentType(contentType != null ? contentType : ("video".equals(fileType) ? "video/mp4" : "image/jpeg"))
						.stream(file.getInputStream(), fileSize, -1)
						.build()
		);
		log.debug("[uploadPosting] ObjectWriteResponse : {}", owr);

		// DB Insert
		FileMaster fileMaster = FileMaster.builder()
				.fileType(fileType)
				.crtIp(ip)
				.crtSeq(userSeq)
				.udtIp(ip)
				.udtSeq(userSeq)
				.build();
		if (fileMasterSeq == null) {
			fileMaster.setDescription("포스팅 파일 업로드");
			fileMapper.insertFileMaster(fileMaster);
		} else {
			fileMaster.setDescription("포스팅 파일 수정 업로드");
			fileMaster.setSeq(fileMasterSeq);
			fileMapper.updateFileMaster(fileMaster);
			fileMapper.deleteFileDetailByMasterSeq(fileMasterSeq);
		}
		log.debug("[uploadPosting] inserted fileMaster : {}", fileMaster);

		FileDetail  fileDetail = FileDetail.builder()
				.masterSeq( fileMaster.getSeq() )
				.fileName(originalFilename)
				.filePath(objectName)
				.fileSize(fileSize)
				.mimeType(contentType)
				.crtIp(ip)
				.crtSeq(userSeq)
				.build();
		fileMapper.insertFileDetail(fileDetail);
		log.debug("[uploadPosting] inserted fileDetail : {}", fileDetail);


		return fileMaster;
	}

	@Override
	public byte[] imageContent(Long seq) {
		FileDetail fileDetail = fileMapper.selectFileDetailOneByMasterSeq( seq );
		log.debug("[imageContent] fileDetail : {}", fileDetail);

		String objectName = fileDetail.getFilePath();

		try (GetObjectResponse is = minioClient.getObject(
				GetObjectArgs.builder()
						.bucket(imagesBucket)
						.object(objectName)
						.build()
		)) {
			return is.readAllBytes(); // Java 9+, JDK 21 OK
		} catch (Exception e) {
			return new byte[0];
		}
	}

	@Override
	public StreamResult streamVideo(Long seq, String rangeHeader) {
		FileDetail fileDetail = fileMapper.selectFileDetailOneByMasterSeq(seq);
		String objectName = fileDetail.getFilePath();
		String contentType = StringUtils.defaultIfBlank(fileDetail.getMimeType(), "video/mp4");
		try {
			// Get total size
			StatObjectResponse stat = minioClient.statObject(
					StatObjectArgs.builder()
							.bucket(videosBucket)
							.object(objectName)
							.build()
			);
			long total = stat.size();

			long start = 0L;
			long end = total - 1;
			boolean partial = false;
			if (StringUtils.isNotBlank(rangeHeader) && rangeHeader.startsWith("bytes=")) {
				partial = true;
				String rangeVal = rangeHeader.substring(6).trim(); // after 'bytes='
				// forms: N- or N-M
				if (rangeVal.contains("-")) {
					String[] parts = rangeVal.split("-", 2);
					String startStr = parts[0].trim();
					String endStr = parts[1].trim();
					if (StringUtils.isNotBlank(startStr)) {
						start = Long.parseLong(startStr);
					}
					if (StringUtils.isNotBlank(endStr)) {
						end = Long.parseLong(endStr);
					} else {
						end = total - 1;
					}
				}
				if (start > end) {
					start = 0;
					end = total - 1;
					partial = false;
				}
			}

			long length = end - start + 1;
			GetObjectArgs.Builder builder = GetObjectArgs.builder()
					.bucket(videosBucket)
					.object(objectName);
			if (partial) {
				builder.offset(start).length(length);
			}
			GetObjectResponse is = minioClient.getObject(builder.build());
			return StreamResult.builder()
					.inputStream(is)
					.start(start)
					.end(end)
					.total(total)
					.contentLength(length)
					.contentType(contentType)
					.partial(partial)
					.build();
		} catch (Exception e) {
			throw new RuntimeException("Video streaming 실패", e);
		}
	}

	private void ensureBucket(String bucket) throws Exception {
		boolean exists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
		if (!exists) {
			minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
		}
	}
}
