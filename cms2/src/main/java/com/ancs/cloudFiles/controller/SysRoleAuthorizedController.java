package com.ancs.cloudFiles.controller;


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

import com.ancs.cloudFiles.models.SysRoleAuthorized;
import com.ancs.cloudFiles.services.SysRoleAuthorizedRepository;

@Controller
@RequestMapping("/sys/sysroleauthorized")
public class SysRoleAuthorizedController {
	@Autowired
	private SysRoleAuthorizedRepository repository;

	@GetMapping("/list")
	public ModelAndView list(@RequestParam(name="page",required=false)Integer page) {
		ModelAndView modelAndView = new ModelAndView();
		if(null==page)
			page = 0;
		else
			page = page -1;
		if(page<0)
			page = 0;
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		Pageable pager = new PageRequest(page, 20, sort);
		modelAndView.addObject("page",pager);
		Page<SysRoleAuthorized> list = repository.findAll(pager);
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/sys/sysroleauthorized/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/sys/sysroleauthorized/form");
		if (null != id) {
			SysRoleAuthorized model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new SysRoleAuthorized());
		} else {
			modelAndView.addObject("model", new SysRoleAuthorized());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute SysRoleAuthorized model) {
		repository.save(model);
		return "redirect:/sys/sysroleauthorized/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/sys/sysroleauthorized/list";
	}
	@PostMapping("/delIds")
	public String delIds(@RequestParam("selectId")Integer[] ids){
		for(int id:ids){
			repository.delete(id);
		}
		return "redirect:/sys/sysroleauthorized/list";
	}
}
	