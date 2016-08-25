package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsWord;
import com.ancs.cms.services.CmsWordRepository;

@Controller
@RequestMapping("/cms/cmsword")
public class CmsWordController {
	@Autowired
	private CmsWordRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsWord> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmsword/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmsword/form");
		if (null != id) {
			CmsWord model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsWord());
		} else {
			modelAndView.addObject("model", new CmsWord());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsWord model) {
		repository.save(model);
		return "redirect:/cms/cmsword/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmsword/list";
	}
}
	