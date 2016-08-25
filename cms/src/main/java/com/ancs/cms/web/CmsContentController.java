package com.ancs.cms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContent;
import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsContentAttributeRepository;
import com.ancs.cms.services.CmsContentRepository;

@Controller
public class CmsContentController {
	@Autowired
	private CmsContentRepository cmsService;
	@Autowired
	private CmsContentAttributeRepository attributeService;
	@GetMapping("/all")
	@ResponseBody
	@Transactional(readOnly = true)
	public Iterable<CmsContent> all() {
		CmsContentAttribute cms = attributeService.findByContentId(1);
		System.out.println(cms.getText());
		return this.cmsService.findAll();
	}
	
	@RequestMapping(value="/cms/viewOne/{id}")
	public ModelAndView viewOne(@PathVariable("id") String id){
		ModelAndView model = new ModelAndView();
		model.setViewName("cms/index");
		CmsContent cmsContent = cmsService.findOne(Integer.parseInt(id));
		model.addObject("cmsContent", cmsContent);
		CmsContentAttribute attribute = attributeService.findByContentId(Integer.parseInt(id));
		model.addObject("attribute",attribute);
		return model;
	}
	@GetMapping(value="/cms/list")
	public ModelAndView list (@RequestParam("page")Integer page){
		ModelAndView modelAndView = new ModelAndView();
	    Pageable pager =new PageRequest(page, 20); 
	    Page<CmsContent> list = cmsService.findAll(pager);
	    modelAndView.setViewName("cms/list");
	    modelAndView.addObject("list", list);
		return modelAndView;
		
	}
	
	
}
