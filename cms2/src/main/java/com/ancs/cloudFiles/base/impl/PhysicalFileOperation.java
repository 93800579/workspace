package com.ancs.cloudFiles.base.impl;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.ancs.cloudFiles.base.FileOperate;

public class PhysicalFileOperation implements FileOperate {

	@Override
	public File getFile(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String saveFile(String fileName, File file) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String delFile(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getToken() {
		// TODO Auto-generated method stub
		return UUID.randomUUID().toString();
	}

	final static String PATH = "/Users/log/Documents/fastdfs/temp";

	@Override
	public String saveFile(String fileName, MultipartFile file) throws Exception, IOException {
		// TODO Auto-generated method stub
		String saveFile = PATH + File.separator + fileName;
		File sfile = new File(saveFile);
		if (!sfile.exists()) {
			sfile.mkdirs();
		}
		String filename = file.getOriginalFilename();
		File f = new File(saveFile + File.separator + filename);
		// 文件保存路径
		// 转存文件
		file.transferTo(f);
		return f.getAbsolutePath();
	}

}
