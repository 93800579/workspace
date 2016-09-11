package com.ancs.cms.admin.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class LoginControllor {
	@GetMapping("/login")
	public ModelAndView toLogin() {
		return new ModelAndView("login");
	}
	/**
	 * Go login
	 * @param request
	 * @return
	 */
	@RequestMapping(value="login", method=RequestMethod.POST)
	public String login(HttpServletRequest request, RedirectAttributes rediect) {
		String account = request.getParameter("username");
		String password = request.getParameter("password");
		
		UsernamePasswordToken upt = new UsernamePasswordToken(account, password);
		org.apache.shiro.subject.Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(upt);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			rediect.addFlashAttribute("errorText", "您的账号或密码输入错误!");
			return "redirect:/login";
		}
		return "redirect:/index";
	}
	
	@GetMapping("/index")
	public ModelAndView index(){
		return new ModelAndView("/cms/cmscategory/list");
	}
	/**
	 * Exit
	 * @return
	 */
	@RequestMapping("logout")
	public String logout() {
		org.apache.shiro.subject.Subject subject = SecurityUtils.getSubject();
		subject.logout();
		return "redirect:/login";
	}
	
}
