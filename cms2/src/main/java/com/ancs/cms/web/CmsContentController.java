package com.ancs.cms.web;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cloudFiles.base.BaseController;
import com.ancs.cms.models.CmsCategory;
import com.ancs.cms.models.CmsContent;
import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsCategoryRepository;
import com.ancs.cms.services.CmsContentAttributeRepository;
import com.ancs.cms.services.CmsContentRepository;
import com.baidu.ueditor.ActionEnter;
import com.baidu.ueditor.PathFormat;

@Controller
public class CmsContentController extends BaseController {
	@Autowired
	private CmsContentRepository cmsService;
	@Autowired
	private CmsContentAttributeRepository attributeService;

	@Autowired
	private CmsCategoryRepository categoryService;
	@GetMapping("/all")
	@ResponseBody
	@Transactional(readOnly = true)
	public Iterable<CmsContent> all() {
		CmsContentAttribute cms = attributeService.findByContentId(1);
		System.out.println(cms.getText());
		return this.cmsService.findAll();
	}

	@RequestMapping(value = "/cms/viewOne/{id}")
	public ModelAndView viewOne(@PathVariable("id") String id) {
		ModelAndView model = new ModelAndView();
		model.setViewName("cms/index");
		CmsContent cmsContent = cmsService.findOne(Integer.parseInt(id));
		model.addObject("cmsContent", cmsContent);
		CmsContentAttribute attribute = attributeService.findByContentId(Integer.parseInt(id));
		model.addObject("attribute", attribute);
		return model;
	}

	@GetMapping(value = "/cms/list")
	public ModelAndView list(@RequestParam("page") Integer page) {
		ModelAndView modelAndView = new ModelAndView();
		Pageable pager = new PageRequest(page, 20);
		Page<CmsContent> list = cmsService.findAll(pager);
		modelAndView.setViewName("cms/list");
		modelAndView.addObject("list", list);
		return modelAndView;

	}

	@GetMapping(value = "/cms/cmscontent/list")
	public ModelAndView cmscontentlist(@RequestParam(name="page",required=false) Integer page) {
		if (null == page)
			page = 0;
		ModelAndView modelAndView = new ModelAndView();
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		Pageable pager = new PageRequest(page, 20, sort);
		Page<CmsContent> list = cmsService.findAll(pager);
		modelAndView.setViewName("cms/cmscontent/list");
		modelAndView.addObject("page",pager);
		modelAndView.addObject("list", list);
		return modelAndView;

	}

	@GetMapping(value = "/cms/cmscontent/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView model = new ModelAndView();
		CmsContent cmsContent = new CmsContent();
		Iterable<CmsCategory> categorys = categoryService.findAll();
		model.addObject("category", categorys);
		if(null!=id){
			cmsContent = cmsService.getOne(id);
			CmsContentAttribute attribute = attributeService.findByContentId(id);
			if(null!=attribute)
				model.addObject("attribute",attribute);
		}
		model.addObject("model", cmsContent);
		model.setViewName("cms/cmscontent/form");
		return model;

	}

	@PostMapping(value = "/cms/cmscontent/save")
	public String save(@ModelAttribute CmsContent model,CmsContentAttribute attribute) {
		model.setCreateDate(new Date());
		model.setPublishDate(new Date());
		CmsContent cmsContent = cmsService.save(model);
		attribute.setContentId(cmsContent.getId());
		attributeService.save(attribute);
		return "redirect:/cms/cmscontent/list";
	}
	
	
	@Value("${nginx.filepath}")
	private String nginxPath;
	@ResponseBody
	@PostMapping(value = "/cms/cmscontent/saveImage")
	public Map<String, String> saveImage(@RequestParam("file") MultipartFile upfile,
			@RequestParam(name = "imagePathFormat", required = false) String imag) {
		String fileName = upfile.getOriginalFilename();
		// 为了避免重复简单处理
		String image = "/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/";
		String nowName = new Date().getTime() + "_" + fileName;
		String savepath = null;
		if (!upfile.isEmpty()) {
			// 上传位置路径
			// 按照路径新建文件
			savepath = PathFormat.parse(image, nowName);
			File newFile = new File(nginxPath+File.separator+savepath);
			if(!newFile.exists()){
				newFile.mkdirs();
			}
			File readSaved = new File(newFile.getAbsolutePath()+File.separator+nowName);
			// 复制
			try {
				FileCopyUtils.copy(upfile.getBytes(), readSaved);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		// 返回结果信息(UEditor需要)
		Map<String, String> map = new HashMap<String, String>();
		// 是否上传成功
		map.put("state", "SUCCESS");
		// 现在文件名称
		map.put("title", nowName);
		// 文件原名称
		map.put("original", fileName);
		// 文件类型 .+后缀名
		map.put("type", fileName.substring(upfile.getOriginalFilename().lastIndexOf(".")));
		// 文件路径
		map.put("url", savepath+File.separator+nowName);
		// 文件大小（字节数）
		map.put("size", upfile.getSize() + "");
		return map;
	}
	@PostMapping("/cms/cmscontent/delIds")
	public String delIds(@RequestParam("selectId")Integer[] ids){
		for(int id:ids){
			cmsService.delete(id);
		}
		return "redirect:/cms/cmscontent/list";
	}
	@RequestMapping("/ueditor/config")
	public void baiduEdit(HttpServletRequest request, HttpServletResponse response) {
		try {
			response.setContentType("application/json");
			String rootPath = request.getSession().getServletContext().getRealPath("/");

			try {
				String exec = new ActionEnter(request, rootPath).exec();
				PrintWriter writer = response.getWriter();
				writer.write(exec);
				writer.flush();
				writer.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
