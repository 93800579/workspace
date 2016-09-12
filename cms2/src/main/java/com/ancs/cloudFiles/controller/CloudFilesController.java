package com.ancs.cloudFiles.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cloudFiles.base.BaseController;
import com.ancs.cloudFiles.models.CloudFiles;
import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.CloudFilesRepository;
import com.ancs.utils.Result;

@RestController
@RequestMapping("/cloud/dir")
public class CloudFilesController extends BaseController{
	@Autowired
	private CloudFilesRepository repository;

	@GetMapping("/listMine")
	public ModelAndView listMine() {
		Iterable<CloudFiles> parents = repository.findAll();
		ModelAndView modelAndView = new ModelAndView("cloud/dir/listMine");
		modelAndView.addObject("parent", parents);
		return modelAndView;
	}
	
	@GetMapping("/list")
	public Iterable<CloudFiles> list(@RequestParam(name="pid",required=true)Integer pid) {
		SysUser user = getCurrent();
		Iterable<CloudFiles> parents = repository.getByUserIdAndParentId(user.getId(), pid);
		return parents;
	}

	/**
	 * 新增文件夹
	 * @param pid
	 * @param fileName
	 * @return
	 */
	@PostMapping("/add")
	public Result add(@RequestParam(name = "parentId", required = false) Integer pid,
			@RequestParam(name = "dirName", required = true) String fileName) {
		if(null!=fileName){
			CloudFiles files = new CloudFiles();
			files.setFileName(fileName);
			files.setCreateDate(new Date());
			SysUser user = getCurrent();
			files.setUserId(user.getId());
			files.setIsdir(1);
			files.setLastModify(new Date());
			files.setMiji("0");
			files.setParentId(pid);
			repository.save(files);
			if(files.getId()>-1){
				return new Result(true);
			}
			else{
				return new Result("存储失败");
			}
			
		}
		else{
			return new Result("文件名不能为空");
		}
	}
	/**
	 * 把文件（夹）放进回收站
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	public Result delete(@PathVariable Integer id){
		CloudFiles files = repository.findOne(id) ;
		if(null!=files){
			files.setIsDeleted(Byte.parseByte("1"));
			repository.save(files);
			return new Result(true);
		}
		else{
			return new Result("未找到文件");
		}
	}
	@GetMapping("/getback/{id}")
	public Result getBack(@PathVariable Integer id){
		CloudFiles files = repository.findOne(id) ;
		if(null!=files){
			files.setIsDeleted(Byte.parseByte("0"));
			repository.save(files);
			return new Result(true);
		}
		else{
			return new Result("未找到文件");
		}
	}

}
