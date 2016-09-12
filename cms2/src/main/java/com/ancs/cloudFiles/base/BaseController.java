package com.ancs.cloudFiles.base;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cloudFiles.models.SysUser;
import com.ancs.utils.Result;

public class BaseController {

	public SysUser getCurrent() {
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		Object oo = session.getAttribute("currentUser");
		if (null != oo)
			return (SysUser) oo;
		else
			return null;
	}

	public Result rr(boolean isok, String msg) {
		Result result = new Result(isok, msg, null);
		return result;
	}
	@ExceptionHandler({ UnauthenticatedException.class })
	public ModelAndView ehandler(UnauthenticatedException e) {
		ModelAndView modelAndView = new ModelAndView("/alphablue/login");
		modelAndView.addObject("error", "当前未登陆");
		return modelAndView;
	}
}
