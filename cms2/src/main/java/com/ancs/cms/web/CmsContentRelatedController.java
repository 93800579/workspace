package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContentRelated;
import com.ancs.cms.services.CmsContentRelatedRepository;

@Controller
@RequestMapping("/cms/cmscontentrelated")
public class CmsContentRelatedController {
	@Autowired
	private CmsContentRelatedRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsContentRelated> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscontentrelated/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscontentrelated/form");
		if (null != id) {
			CmsContentRelated model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsContentRelated());
		} else {
			modelAndView.addObject("model", new CmsContentRelated());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsContentRelated model) {
		repository.save(model);
		return "redirect:/cms/cmscontentrelated/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscontentrelated/list";
	}
}
	