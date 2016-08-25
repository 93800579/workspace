package com.ancs.cms.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsCategoryType;
import com.ancs.cms.services.CmsCategoryTypeRepository;

@Controller
@RequestMapping("/cms/cmscategorytype")
public class CmsCategoryTypeController {
	@Autowired
	private CmsCategoryTypeRepository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<CmsCategoryType> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/cmscategorytype/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/cmscategorytype/form");
		if (null != id) {
			CmsCategoryType model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new CmsCategoryType());
		} else {
			modelAndView.addObject("model", new CmsCategoryType());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute CmsCategoryType model) {
		repository.save(model);
		return "redirect:/cms/cmscategorytype/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/cmscategorytype/list";
	}
}
	