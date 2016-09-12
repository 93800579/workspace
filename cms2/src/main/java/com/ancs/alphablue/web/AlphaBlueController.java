package com.ancs.alphablue.web;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LogoutAware;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.alphablue.models.AlphablueOrder;
import com.ancs.alphablue.models.AlphablueProduct;
import com.ancs.alphablue.services.AlphablueOrderRepository;
import com.ancs.alphablue.services.AlphablueProductRepository;
import com.ancs.cloudFiles.base.BaseController;
import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.SysUserRepository;
import com.ancs.cms.models.CmsCategory;
import com.ancs.cms.models.CmsContent;
import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsCategoryRepository;
import com.ancs.cms.services.CmsContentAttributeRepository;
import com.ancs.cms.services.CmsContentRepository;
import com.ancs.utils.IdtoValue;

@Controller
@RequestMapping("/alphablue")
public class AlphaBlueController extends BaseController {

	@Autowired
	private CmsCategoryRepository cmsCategoryS;
	@Autowired
	private CmsContentRepository conentS;
	@Autowired
	private SysUserRepository userS;

	@GetMapping("/news")
	public ModelAndView news(@RequestParam("code") String code,
			@RequestParam(name = "page", required = false) Integer page) {
		CmsCategory category = cmsCategoryS.getByCode(code);
		int cid = 21;
		int pageSize = 10;
		if (null == page)
			page = 0;
		else
			page = page - 1;
		if (null != category) {
			cid = category.getId();
			pageSize = category.getPageSize();
		}

		ModelAndView modelAndView = new ModelAndView();
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		Pageable pager = new PageRequest(page, pageSize, sort);
		Page<CmsContent> list = conentS.findByCategoryId(cid, pager);
		modelAndView.addObject("page", pager);
		modelAndView.addObject("list", list);
		modelAndView.addObject("category", category);
		modelAndView.setViewName("/alphablue/news/news");
		return modelAndView;
	}

	@Autowired
	private CmsContentAttributeRepository attributeService;

	@GetMapping("/view")
	public ModelAndView view(@RequestParam(name="id") Integer id) {
		ModelAndView model = new ModelAndView();
		model.setViewName("/alphablue/news/newsinfo");
		CmsContent cmsContent = conentS.findOne(id);
		CmsCategory category = cmsCategoryS.findOne(cmsContent.getCategoryId());
		model.addObject("cmsContent", cmsContent);
		model.addObject("category", category);
		CmsContentAttribute attribute = attributeService.findByContentId(id);
		model.addObject("attribute", attribute);
		return model;
	}

	@GetMapping("/login")
	public ModelAndView toLogin(@RequestParam(name = "error", required = false) String error) {
		SysUser user = super.getCurrent();

		ModelAndView modelAndView = new ModelAndView("/alphablue/login");
		if (null != user) {
			modelAndView.setViewName("redirect:/alphablue/user");
		}
		if (null != error)
			modelAndView.addObject("error", "用户名密码错误");
		return modelAndView;
	}

	@PostMapping("/login")

	public String login(@RequestParam(name = "username") String username,
			@RequestParam(name = "password") String password) {
		UsernamePasswordToken upt = new UsernamePasswordToken(username, password);
		org.apache.shiro.subject.Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(upt);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			return "redirect:/alphablue/login?error=1";
		}
		return "redirect:/alphablue/user";
	}

	@GetMapping("/logout")
	public String logout() {
		org.apache.shiro.subject.Subject subject = SecurityUtils.getSubject();
		subject.logout();
		return "redirct:/alphablue/index";
	}

	@RequiresUser
	@GetMapping("/user")
	public ModelAndView user() {

		ModelAndView model = new ModelAndView("/alphablue/user");
		return model;
	}

	@GetMapping("/updateUser")
	public ModelAndView updateUser() {
		ModelAndView model = new ModelAndView("/alphablue/user");
		return model;
	}

	@PostMapping("/updateUser")
	public ModelAndView updateUserProFile() {
		return new ModelAndView("/alphablue/user");
	}

	@GetMapping("/regist")
	public ModelAndView toRegister() {
		return new ModelAndView("/alphablue/regist");
	}

	@PostMapping("/regist")
	public ModelAndView regist(@ModelAttribute SysUser user) {
		ModelAndView modelAndView = new ModelAndView();
		user.setRegisteredDate(new Date());
		user.setLastLoginDate(new Date());
		String before = user.getPassword();
		user.setPassword(new Md5Hash(before).toString());

		SysUser saveu = userS.save(user);

		UsernamePasswordToken upt = new UsernamePasswordToken(saveu.getName(), before);
		org.apache.shiro.subject.Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(upt);
			modelAndView.setViewName("redirect:/alphablue/user");
		} catch (AuthenticationException e) {
			e.printStackTrace();
		}
		return modelAndView;
	}

	@Autowired
	private AlphablueProductRepository porductS;
	@Autowired
	private AlphablueOrderRepository alphablueOrderS;
	/**
	 * 订单信息
	 * 
	 * @return
	 */
	@Autowired
	private IdtoValue idt;

	@GetMapping("/payform")
	@RequiresAuthentication
	public ModelAndView myorder() {
		ModelAndView modelAndView = new ModelAndView();
		Order order = new Order(Direction.DESC, "id");
		Sort sort = new Sort(order);
		Iterable<AlphablueOrder> orders = alphablueOrderS.findByUserId(getCurrent().getId(), sort);
		modelAndView.addObject("list", orders);
		modelAndView.addObject("idt", idt);
		modelAndView.setViewName("/alphablue/pay_form");
		return modelAndView;
	}

	@GetMapping("/tobuy")
	@RequiresAuthentication
	public ModelAndView tobuy() {
		List<AlphablueProduct> products = porductS.findAll();
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("/alphablue/buy_first");
		modelAndView.addObject("products", products);
		return modelAndView;
	}

	@PostMapping("tobuy")
	@RequiresAuthentication
	public ModelAndView toBuy(@ModelAttribute AlphablueOrder order) {
		SysUser user = getCurrent();
		ModelAndView modelAndView = new ModelAndView();
		AlphablueProduct product = porductS.findOne(order.getProductId());
		if (null != product) {
			float checked = product.getPrice() * order.getCount();
			float num = (float) (Math.round(checked * 100) / 100);
			float orderPrice = (float) (Math.round(order.getAllprice() * 100) / 100);
			if (num == orderPrice) {
				order.setCreatedate(new Date());
				order.setUserId(user.getId());
				alphablueOrderS.save(order);
				modelAndView.setViewName("redirect:/alphablue/pay?orderId=" + order.getId());
			} else {
				modelAndView.setViewName("/alphablue/buyerror");
				modelAndView.addObject("eror", "产品价格验证失败");
			}
		} else {
			modelAndView.setViewName("/alphablue/buyerror");
			modelAndView.addObject("error", "产品选择失败");
		}
		return modelAndView;
	}

	public static String getRandomString(int length) {
		StringBuffer buffer = new StringBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
		StringBuffer sb = new StringBuffer();
		Random random = new Random();
		int range = buffer.length();
		for (int i = 0; i < length; i++) {
			sb.append(buffer.charAt(random.nextInt(range)));
		}
		return sb.toString();
	}

	@Value(value = "weixin.appid")
	private String appid;
	@Value(value = "weixin.mch_id")
	private String mch_id;
	@Value(value = "weixin.sign")
	private String sign;

	private String getWeiXinPay(AlphablueOrder order) {
		String nonce = getRandomString(16);
		String before = "appid=" + appid + "&mch_id=" + mch_id + "&nonce_str=" + nonce + "&product_id=" + order.getId()
				+ "&time_stamp="+Calendar.getInstance().getTimeInMillis()/1000;
		String signed = new Md5Hash(before).toString().toUpperCase();
		String url = "weixin://wxpay/bizpayurl?sign="+signed+"&"+before;
		return url;

	}

	/**
	 * 付款
	 * 
	 * @return
	 */
	@GetMapping("/pay")
	@RequiresAuthentication
	public ModelAndView pay(@RequestParam Integer orderId) {

		AlphablueOrder order = alphablueOrderS.findOne(orderId);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("idt", idt);
		modelAndView.addObject("order", order);
		String payUrl = getWeiXinPay(order);
		modelAndView.addObject("payUrl",payUrl);
		modelAndView.setViewName("/alphablue/pay");
		return modelAndView;
	}

	@GetMapping("/detail")
	@RequiresAuthentication
	public ModelAndView detail(@RequestParam Integer orderId) {

		AlphablueOrder order = alphablueOrderS.findOne(orderId);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("idt", idt);
		modelAndView.addObject("order", order);
		modelAndView.setViewName("/alphablue/detail");
		return modelAndView;
	}

}
