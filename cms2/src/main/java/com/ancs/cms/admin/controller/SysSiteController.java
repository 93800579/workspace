package com.ancs.cms.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.admin.models.SysSite;
import com.ancs.cms.admin.service.SysSiteRepository;

@Controller
@RequestMapping("/cms/admin/sysSite")
public class SysSiteController {
	@Autowired
	private SysSiteRepository siteRepository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		List<SysSite> list = siteRepository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/admin/sysSite/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/admin/sysSite/form");
		if (null != id) {
			SysSite sysSite = siteRepository.findOne(id);
			if (null != sysSite)
				modelAndView.addObject("model", sysSite);
			else
				modelAndView.addObject("model", new SysSite());
		} else {
			modelAndView.addObject("model", new SysSite());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute SysSite model) {
		siteRepository.save(model);
		return "redirect:/cms/admin/sysSite/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.siteRepository.delete(id);
		return "redirect:/cms/admin/sysSite/list";
	}
}
