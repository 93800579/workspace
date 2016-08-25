package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsCategoryModel;
import com.ancs.cms.services.CmsCategoryModelRepository;

@Controller
@RequestMapping("/cms/cmscategorymodel")
public class CmsCategoryModelController {
	@Autowired
	private CmsCategoryModelRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsCategoryModel> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscategorymodel/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscategorymodel/form");
		if (null != id) {
			CmsCategoryModel model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsCategoryModel());
		} else {
			modelAndView.addObject("model", new CmsCategoryModel());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsCategoryModel model) {
		repository.save(model);
		return "redirect:/cms/cmscategorymodel/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscategorymodel/list";
	}
}
	