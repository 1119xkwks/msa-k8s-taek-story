package com.example.fileservice.mapper;

import com.example.fileservice.model.FileDetail;
import com.example.fileservice.model.FileMaster;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
	int insertFileMaster(FileMaster fileMaster);
	int updateFileMaster(FileMaster fileMaster);

	int insertFileDetail(FileDetail fileDetail);
	int deleteFileDetailByMasterSeq(Long fileMasterSeq);

	FileDetail selectFileDetailOneByMasterSeq(Long seq);
}