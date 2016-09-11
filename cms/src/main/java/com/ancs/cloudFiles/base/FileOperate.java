package com.ancs.cloudFiles.base;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileOperate {
	public File getFile(String fileName);
	public String saveFile(String fileName,File file);
	public String delFile(String fileName);
	public String saveFile(String fileName,MultipartFile file) throws Exception, IOException;
	public String getToken();
	
	
}
