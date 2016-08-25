package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsTagType;
import com.ancs.cms.services.CmsTagTypeRepository;

@Controller
@RequestMapping("/cms/cmstagtype")
public class CmsTagTypeController {
	@Autowired
	private CmsTagTypeRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsTagType> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmstagtype/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmstagtype/form");
		if (null != id) {
			CmsTagType model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsTagType());
		} else {
			modelAndView.addObject("model", new CmsTagType());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsTagType model) {
		repository.save(model);
		return "redirect:/cms/cmstagtype/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmstagtype/list";
	}
}
	