package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsPlaceAttribute;
import com.ancs.cms.services.CmsPlaceAttributeRepository;

@Controller
@RequestMapping("/cms/cmsplaceattribute")
public class CmsPlaceAttributeController {
	@Autowired
	private CmsPlaceAttributeRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsPlaceAttribute> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmsplaceattribute/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmsplaceattribute/form");
		if (null != id) {
			CmsPlaceAttribute model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsPlaceAttribute());
		} else {
			modelAndView.addObject("model", new CmsPlaceAttribute());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsPlaceAttribute model) {
		repository.save(model);
		return "redirect:/cms/cmsplaceattribute/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmsplaceattribute/list";
	}
}
	