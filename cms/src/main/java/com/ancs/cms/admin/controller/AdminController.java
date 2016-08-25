package com.ancs.cms.admin.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.models.CmsContent;
import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsContentAttributeRepository;
import com.ancs.cms.services.CmsContentRepository;

@Controller
@RequestMapping(value = "/cms/admin")
public class AdminController {
	@Autowired
	private CmsContentAttributeRepository attributeService;
	@Autowired
	private CmsContentRepository cmsService;

	@GetMapping("/login")
	public ModelAndView login() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/admin/login");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView form(@RequestParam(required = false, name = "id") String id) {

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/admin/form");
		if (null != id && id.length() > 0) {
			CmsContent cmsContent = cmsService.findOne(Integer.parseInt(id));
			modelAndView.addObject(cmsContent);
			CmsContentAttribute attribute = attributeService.findByContentId(Integer.parseInt(id));
			modelAndView.addObject(attribute);
		} else {
			CmsContent cmsContent = new CmsContent();
			modelAndView.addObject(cmsContent);
			CmsContentAttribute attribute = new CmsContentAttribute();
			modelAndView.addObject(attribute);
		}
		return modelAndView;
	}

	@PostMapping("/saveForm")
	public ModelAndView saveForm(@RequestParam("title") String title, @RequestParam("content") String con,
			@RequestParam("category") String category, @RequestParam(required = false, name = "id") Integer id) {
		CmsContent content = null;
		CmsContentAttribute ca = null;
		if (null == id) {
			content = new CmsContent();
			ca = new CmsContentAttribute();
		} else {
			content = cmsService.findOne(id);
			ca = attributeService.findByContentId(id);

		}
		content.setTitle(title);
		content.update(15);
		try {
			content.setCreateDate(new Date());
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			System.out.println(content.getTitle());
			CmsContent saved = cmsService.save(content);
			ca.setContentId(saved.getId());
			ca.setText(con);
			System.out.println(ca.getText());
			ca.setWordCount(con.length());
			attributeService.save(ca);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ModelAndView("redirect:/cms/admin/list");
	}

	@RequestMapping("/list")
	public ModelAndView list(@RequestParam(required = false, name = "page") Integer page,
			@RequestParam(required = false, name = "key") String key) {
		if (null == page)
			page = 0;
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		ModelAndView modelAndView = new ModelAndView();
		Pageable pager = new PageRequest(page, 20, sort);
		Page<CmsContent> list = null;
		if (null != key && key.length() > 0) {
			CmsContent content = new CmsContent();
			content.setTitle(key);
			Example<CmsContent> example = Example.of(content);
			list = cmsService.findAll(example, pager);
		} else {
			list = cmsService.findAll(pager);
		}
		modelAndView.setViewName("cms/admin/list");
		modelAndView.addObject("list", list);
		modelAndView.addObject("page", pager);
		return modelAndView;

	}
	@GetMapping("/charts")
	public ModelAndView charts() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/admin/adminCharts");
		return modelAndView;
	}
}
