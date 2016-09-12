package com.ancs.cloudFiles.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ancs.cloudFiles.base.BaseController;
import com.ancs.cloudFiles.base.FileOperate;
import com.ancs.cloudFiles.models.CloudFiles;
import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.CloudFilesRepository;
import com.ancs.utils.Result;

@Controller
@RequestMapping("/cloud/file")
public class FileController extends BaseController {

	@Autowired
	private FileOperate operate;

	@Autowired
	private CloudFilesRepository repository;

	@PostMapping
	@ResponseBody
	public Result uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("pid") Integer pid) {
		try {
			String path = operate.saveFile(System.currentTimeMillis() + "", file);
			CloudFiles files = new CloudFiles();
			files.setFileName(file.getOriginalFilename());
			files.setCreateDate(new Date());
			SysUser user = getCurrent();
			files.setUserId(user.getId());
			files.setIsdir(0);
			files.setLastModify(new Date());
			files.setMiji("0");
			files.setParentId(pid);
			files.setFilePath(path);
			files.setFileSize(file.getSize());
			repository.save(files);
			return rr(true, null);
		} catch (Exception e) {
			e.printStackTrace();
			return rr(false, "文件保存失败");
		}

	}

}
