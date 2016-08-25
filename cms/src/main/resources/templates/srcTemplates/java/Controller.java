package [[${packageName}]];


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import [[${modelPackage}]].[[${className}]];
import com.ancs.cms.services.[[${className}]]Repository;

@Controller
@RequestMapping("/cms/[[${#strings.toLowerCase(className)}]]")
public class [[${className}]]Controller {
	@Autowired
	private [[${className}]]Repository repository;

	@GetMapping("/list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView();
		Iterable<[[${className}]]> list = repository.findAll();
		modelAndView.addObject("list", list);
		modelAndView.setViewName("/cms/[[${#strings.toLowerCase(className)}]]/list");
		return modelAndView;
	}

	@GetMapping("/form")
	public ModelAndView addOrEdit(@RequestParam(required = false, name = "id") Integer id) {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/cms/[[${#strings.toLowerCase(className)}]]/form");
		if (null != id) {
			[[${className}]] model = repository.findOne(id);
			if (null != model)
				modelAndView.addObject("model", model);
			else
				modelAndView.addObject("model", new [[${className}]]());
		} else {
			modelAndView.addObject("model", new [[${className}]]());
		}
		return modelAndView;
	}

	@PostMapping("save")
	public String save(@ModelAttribute [[${className}]] model) {
		repository.save(model);
		return "redirect:/cms/[[${#strings.toLowerCase(className)}]]/list";
	}
	@GetMapping("/del")
	public String del(@RequestParam("id")Integer id){
		this.repository.delete(id);
		return "redirect:/cms/[[${#strings.toLowerCase(className)}]]/list";
	}
}
	