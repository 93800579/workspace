package com.ancs.cms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ancs.cms.utils.zhihu.compents.SyncFromZhihu;


@Controller
public class SyncFromZhihuController {
	@Autowired
	private SyncFromZhihu sync;
	@GetMapping("/sync")
	@ResponseBody
	public String beginSync(){
		sync.sync();
		return "done";
	}
	@GetMapping("/syncToday")
	@ResponseBody
	public String syncToday(){
		sync.syncToday();
		return "done";
	}
}
