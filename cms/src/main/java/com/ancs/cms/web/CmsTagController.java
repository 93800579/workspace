package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsTag;
import com.ancs.cms.services.CmsTagRepository;

@Controller
@RequestMapping("/cms/cmstag")
public class CmsTagController {
	@Autowired
	private CmsTagRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsTag> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmstag/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmstag/form");
		if (null != id) {
			CmsTag model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsTag());
		} else {
			modelAndView.addObject("model", new CmsTag());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsTag model) {
		repository.save(model);
		return "redirect:/cms/cmstag/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmstag/list";
	}
}
	