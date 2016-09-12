package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContentFile;
import com.ancs.cms.services.CmsContentFileRepository;

@Controller
@RequestMapping("/cms/cmscontentfile")
public class CmsContentFileController {
	@Autowired
	private CmsContentFileRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsContentFile> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscontentfile/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscontentfile/form");
		if (null != id) {
			CmsContentFile model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsContentFile());
		} else {
			modelAndView.addObject("model", new CmsContentFile());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsContentFile model) {
		repository.save(model);
		return "redirect:/cms/cmscontentfile/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscontentfile/list";
	}
}
	