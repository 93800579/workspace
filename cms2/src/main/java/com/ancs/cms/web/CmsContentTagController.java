package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContentTag;
import com.ancs.cms.services.CmsContentTagRepository;

@Controller
@RequestMapping("/cms/cmscontenttag")
public class CmsContentTagController {
	@Autowired
	private CmsContentTagRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsContentTag> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscontenttag/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscontenttag/form");
		if (null != id) {
			CmsContentTag model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsContentTag());
		} else {
			modelAndView.addObject("model", new CmsContentTag());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsContentTag model) {
		repository.save(model);
		return "redirect:/cms/cmscontenttag/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscontenttag/list";
	}
}
	