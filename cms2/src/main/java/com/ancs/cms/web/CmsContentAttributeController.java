package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsContentAttributeRepository;

@Controller
@RequestMapping("/cms/cmscontentattribute")
public class CmsContentAttributeController {
	@Autowired
	private CmsContentAttributeRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsContentAttribute> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscontentattribute/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscontentattribute/form");
		if (null != id) {
			CmsContentAttribute model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsContentAttribute());
		} else {
			modelAndView.addObject("model", new CmsContentAttribute());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsContentAttribute model) {
		repository.save(model);
		return "redirect:/cms/cmscontentattribute/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscontentattribute/list";
	}
}
	