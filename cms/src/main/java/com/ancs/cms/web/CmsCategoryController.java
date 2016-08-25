package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsCategory;
import com.ancs.cms.services.CmsCategoryRepository;

@Controller
@RequestMapping("/cms/cmscategory")
public class CmsCategoryController {
	@Autowired
	private CmsCategoryRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsCategory> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscategory/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscategory/form");
		if (null != id) {
			CmsCategory model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsCategory());
		} else {
			modelAndView.addObject("model", new CmsCategory());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsCategory model) {
		repository.save(model);
		return "redirect:/cms/cmscategory/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscategory/list";
	}
}
	