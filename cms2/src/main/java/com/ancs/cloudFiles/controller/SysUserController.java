package com.ancs.cloudFiles.controller;


import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.SysUserRepository;
@RequiresAuthentication
@Controller
@RequestMapping("/sys/sysuser")
public class SysUserController {
	@Autowired
	private SysUserRepository repository;
	@RequiresAuthentication
	@RequiresRoles("admin")
	@GetMapping("/list")
	public ModelAndView list(@RequestParam(name="page",required=false)Integer page) {
		ModelAndView modelAndView = new ModelAndView();
		if(null==page)
			page = 0;
		else
			page = page -1;
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		Pageable pager = new PageRequest(page, 20, sort);
		modelAndView.setViewName("cms/cmscontent/list");
		modelAndView.addObject("page",pager);
		Page<SysUser> list = repository.findAll(pager);
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/sys/sysuser/list");
		return modelAndView;
	}

	@RequiresAuthentication
	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/sys/sysuser/form");
		if (null != id) {
			SysUser model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new SysUser());
		} else {
			modelAndView.addObject("model", new SysUser());
		}
		return modelAndView;
	}

	@RequiresAuthentication
	@PostMapping("save")
	public String save(@ModelAttribute SysUser model) {
		repository.save(model);
		return "redirect:/sys/sysuser/list";
	}
	@RequiresAuthentication
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/sys/sysuser/list";
	}
	@RequiresAuthentication
	@RequiresRoles("admin")
	@PostMapping("/delIds")
	public String delIds(@RequestParam("selectId")Integer[] ids){
		for(int id:ids){
			repository.delete(id);
		}
		return "redirect:/sys/sysuser/list";
	}
}
	