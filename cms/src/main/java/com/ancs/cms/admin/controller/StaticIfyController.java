package com.ancs.cms.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ancs.cms.common.base.staticTool.StaticTool;
@Controller
public class StaticIfyController {
	@Autowired
	private StaticTool tool;
	@GetMapping(value="/cms/static/{id}")
	public boolean staticView(@PathVariable("id")Integer id){
		String url = "http://127.0.0.1:8000/cms//viewOne/"+id;
		String path = "/Users//log/Documents/temp";
		String fileName = id+".html";
		return tool.staticFor(url, path, fileName);
	}
}
