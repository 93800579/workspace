/**
 * 手机号&邮箱正则表达式
 */
var REGEX_PHONE=/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
//var REGEX_EMAIL=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
var REGEX_EMAIL=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
var cacheInfo = {};


/* 控制个人曲线的展示，默认为true. 各个具体的页面也可以根据逻辑 
 * 去控制个人曲线基础数据的生成，从而控制个人曲线的展示。
 */
var isShowPersonLine = true;

/**
 * 在使用indexOf方法前，执行一下下面的js, 原理就是如果发现数组没有indexOf方法，会添加上这个方法。
 */
if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(elt /* , from */){
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++){
      if (from in this &&this[from] === elt)
        return from;
    }
    return -1;
  };
}
/** 支持substring*/
//if (!String.prototype.substring){
//	Array.prototype.substring = Array.prototype.substr; 
//}

function doget(a, o, d, c) {
	ajax(a, o, d, 'get', c);
}
function dopost(a, o, d, c) {
	ajax(a, o, d, 'post', c);
}
function ajax(a, o, d, m, c) {
	//$zpy.comfirm($.isFunction(ts));
	
	
	var p = "pd.action=" + a + "&pd.data=" + encodeURIComponent(ts(d)) + "&pd.operate=" + o;
	$.ajax({
		// 后台处理程序
		url : "postaction.action",
		// 数据发送方式
		type : m,
		// 接受数据格式
		dataType : "json",
		// 要传递的数据
		data : p,
		// 回传函数
		timeout : 200000,// 设置请求超时时间（毫秒）。
		error : function(msg) {// 请求失败时调用函数。
			//$zpy.comfirm(msg.responseText);
			//location.href = msg.responseText;
			//$zpy.comfirm("请求失败!" + msg.status+msg.statusText +json2str(msg));
		},
		success : function(dataObj) {
			/*非法字符错误提示处理*/
			var vCode = s2j(dataObj.message).code
			if (typeof(vCode)=="undefined") {
				return;
			}
			//
			if (vCode == "AUTHOR001") {
				location.href = "../login/login.html";
				return;
			}
			
			// 请求成功后回调函数。
			dataObj.message = s2j(dataObj.message);
			if (c == null) {
				afterDo(dataObj);
			} else if(typeof(c) == "function"){
				c(dataObj);
			} else {
				eval(c + "(" + ts(dataObj) + ");");
			}
		}
	});
}

function ts(s) {
	if (typeof (s) == 'string')
		return JSON.parse(s);
	else
		return JSON.stringify(s);
}
function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null)
			return json2str(s);
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}
	for ( var i in o)
		arr.push("'" + i + "':" + fmt(o[i]));
	return '{' + arr.join(',') + '}';
}
function s2j(stringValue) {
	eval("var theJsonValue = " + stringValue);
	return theJsonValue;
}
// javascript获取指定参数及其对应的值
function getParameter(paraStr) {
	var tURL = window.location.href;
	var result = "";
	// 获取URL中全部参数列表数据
	var str = "&" + tURL.split("?")[1];
	var paraName = paraStr + "=";
	// 判断要获取的参数是否存在
	if (str.indexOf("&" + paraName) != -1) { 
		// 如果要获取的参数到结尾是否还包含“&”
		if (str.substring(str.indexOf(paraName), str.length).indexOf("&") != -1) {
			// 得到要获取的参数到结尾的字符串
			var TmpStr = str.substring(str.indexOf(paraName), str.length);
			// 截取从参数开始到最近的“&”出现位置间的字符
			result = TmpStr.substr(TmpStr.indexOf(paraName), TmpStr
					.indexOf("&")
					- TmpStr.indexOf(paraName));
		} else {
			result = str.substring(str.indexOf(paraName), str.length);
		}
	} else {
		result = "无此参数";
	}
	result = result.replace("&", "");
	result = result.split("=")[1];
	if (result == 'undefined' || result == undefined)
		result = '';

	return (result);
}
/**
 * 判断对象是否为空
 */
function isNull(obj){
	if (obj!=null&&typeof(obj)!="undefined"&&obj!=""&&obj!="null") {
		return false;
	}else{
		return true;
	}
}

function loading(canvas, options) {
	this.canvas = canvas;
	if (options) {
		this.radius = options.radius || 12;
		this.circleLineWidth = options.circleLineWidth || 4;
		this.circleColor = options.circleColor || 'lightgray';
		this.moveArcColor = options.moveArcColor || 'gray';
	} else {
		this.radius = 12;
		this.circelLineWidth = 4;
		this.circleColor = 'lightgray';
		this.moveArcColor = 'gray';
	}
}
loading.prototype = {
	show : function() {
		var canvas = this.canvas;
		if (!canvas.getContext)
			return;
		if (canvas.__loading)
			return;
		canvas.__loading = this;
		var ctx = canvas.getContext('2d');
		var radius = this.radius;
		var me = this;
		var rotatorAngle = Math.PI * 1.5;
		var step = Math.PI / 6;
		canvas.loadingInterval = setInterval(function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var lineWidth = me.circleLineWidth;
			var center = {
				x : canvas.width / 2 - radius,
				y : canvas.height / 2 - radius
			};
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = me.circleColor;
			ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.stroke();
			// 在圆圈上面画小圆
			ctx.beginPath();
			ctx.strokeStyle = me.moveArcColor;
			ctx.arc(center.x, center.y, radius, rotatorAngle, rotatorAngle
					+ Math.PI * .45);
			ctx.stroke();
			rotatorAngle += step;

		}, 50);
	},
	hide : function() {
		var canvas = this.canvas;
		canvas.__loading = false;
		if (canvas.loadingInterval) {
			window.clearInterval(canvas.loadingInterval);
		}
		var ctx = canvas.getContext('2d');
		if (ctx)
			ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};

function showLoading(n) {
	// $zpy.comfirm(n+"s");
	// $zpy.comfirm(1);
	$(document.body).append(
			"<canvas id=\"" + n
					+ "\" class=\"loadingCanvas\">您的浏览器不支持html5</canvas>");
	// $zpy.comfirm(2);
	eval("var " + n + " = new loading(document.getElementById('" + n
			+ "'),{radius:30,circleLineWidth:29});");
	// $zpy.comfirm(3);
	eval("" + n + ".show();");
	// $zpy.comfirm(4+n);
}
function stopLoading(n) {
	$("#" + n).remove();
}

function showMsg(s, t) {
	if (t == null || t == undefined)
		t = 1000;
	var myDate = new Date()
	var limit = myDate.getTime();
	$(document.body).append(
			"<div class=\"dis_non_msg\" id=\"" + limit
					+ "\"><h2 class=\"title\">" + s + "</h2></div>");
	var t = setTimeout("showMsgHide('" + limit + "')", t);
}
function showMsgHide(l) {
	$("#" + l).remove();
}
/*
 * 
 * 用户注册、找回密码、登录等公共方法
 */
function displayck() {
	// 单选按钮实现
	if (document.getElementById("a").checked) {
		document.getElementById("phone").style.display = "block";
		document.getElementById("email").style.display = "none";
		document.getElementById("quest").style.display = "none";
	}
	if (document.getElementById("s").checked) {
		document.getElementById("phone").style.display = "none";
		document.getElementById("email").style.display = "block";
		document.getElementById("quest").style.display = "none";
	}
	if (document.getElementById("d").checked) {
		document.getElementById("phone").style.display = "none";
		document.getElementById("email").style.display = "none";
		document.getElementById("quest").style.display = "block";
	}
	;

};
// CharMode函数 验证密码
// 测试某个字符是属于哪一类.
function CharMode(iN) {
	if (iN >= 48 && iN <= 57) // 数字
		return 1;
	if (iN >= 65 && iN <= 90) // 大写字母
		return 2;
	if (iN >= 97 && iN <= 122) // 小写
		return 4;
	else
		return 8; // 特殊字符
}
// bitTotal函数
// 计算出当前密码当中一共有多少种模式
function bitTotal(num) {
	modes = 0;
	for (i = 0; i < 4; i++) {
		if (num & 1)
			modes++;
		num >>>= 1;
	}
	return modes;
}
// checkStrong函数
// 返回密码的强度级别
function checkStrong(sPW) {
	if (sPW.length <= 6)
		return 0; // 密码太短
	Modes = 0;
	for (i = 0; i < sPW.length; i++) {
		// 测试每一个字符的类别并统计一共有多少种模式.
		Modes |= CharMode(sPW.charCodeAt(i));
	}
	return bitTotal(Modes);
}
// pwStrength函数
// 当用户放开键盘或密码输入框失去焦点时，根据不同的级别显示不同的颜色
function pwStrength(pwd) {
	O_color = "#eeeeee";
	L_color = "#FF0000";
	M_color = "#FF9900";
	H_color = "#33CC00";
	if (pwd == null || pwd == '') {
		Lcolor = Mcolor = Hcolor = O_color;
	} else {
		S_level = checkStrong(pwd);
		switch (S_level) {
		case 0:
			Lcolor = Mcolor = Hcolor = O_color;
		case 1:
			Lcolor = L_color;
			Mcolor = Hcolor = O_color;
			break;
		case 2:
			Lcolor = Mcolor = M_color;
			Hcolor = O_color;
			break;
		default:
			Lcolor = Mcolor = Hcolor = H_color;
		}
	}
	document.getElementById("strength_L").style.background = Lcolor;
	document.getElementById("strength_M").style.background = Mcolor;
	document.getElementById("strength_H").style.background = Hcolor;
	return;
}

/*
 * 验证码 注册页面
 */
var code; // 在全局 定义验证码
function createCode() {
	$("#randImage").attr("src",ctx+"common/jsp/imagecode.jsp?" + Math.random());
	$("#h_sCodeFlag").val("");
}


/**
 * 初始化：生成验证码
 */
function initSecurityCode(){
	$("#randImage").attr("src",ctx+"common/jsp/imagecode.jsp?"+Math.random());
	$("#randImage").attr("alt","验证码");
	$("#randImage").css("margin-top","0px");
	$("#randImage").click(function(){
		createCode();
	});
}

//换验证码并清除旧样式
function createCode_new(){
	$("#yanzhengma").html("");
	createCode();
	
}

/**
 * 验证码校验
 */
function secCodeValidate(){
	// 验证码 校验
	
	var inputCode = $("#input1").val();
	if (inputCode.length <= 0) {
		$("#yanzhengma").css("display","block");
		$("#yanzhengma").html("<span></span><b><font color='#999999'>请输入验证码</font></b>");
		return false;
	}else{
		$.post(ctx+"common/jsp/validate.jsp",{"secCode":inputCode},function(d){
			var jsonObj = s2j(d);
			if ("Y"==jsonObj.code) {
				$("#yanzhengma").html("<span></span><b class='bs'><font>&nbsp;</font></b>");
				//验证码正确时 删除感叹号的图片
				$("#yanzhengma").find("b").removeClass("bs");
				$("#yanzhengma").find("b").addClass("ok");
				$("#yanzhengma").find("span").css("background","none");
			}else{
				$("#yanzhengma").html("<span></span><b><font color='#999999'>验证码错误</font></b>");
				createCode();
				return false;
			}
			$("#h_sCodeFlag").val(jsonObj.code);
		});
	}
}

/**
 * 验证码：校验
 */
function validate() {
	// 验证码 校验
	var inputCode = $("#input1").val();
	if (inputCode.length <= 0) {
		document.getElementById("yanzhengma").style.display = "block";
		$("#yanzhengma").html("<span></span><b><font color='#999999'>请输入验证码</font></b>");
		return false;
	}else{
		$.post(ctx+"common/jsp/validate.jsp",{"secCode":inputCode},function(d){
			var jsonObj = s2j(d);
			if ("Y"==jsonObj.code) {
				$("#yanzhengma").html("<span></span><b class='bs'><font>&nbsp;</font></b>");
				//验证码正确时 删除感叹号的图片
				$("#yanzhengma").find("b").removeClass("bs");
				$("#yanzhengma").find("b").addClass("ok");
				$("#yanzhengma").find("span").css("background","none");
				return true;
			}else{
				$("#yanzhengma").html("<span></span><b><font color='#999999'>验证码错误</font></b>");
				createCode();
				return false;
			}
		});
	}
}


/**
 * 倒计时公共方法
 * 
 * @param obj
 * @param fromdate
 */
function initime(obj, fromdate) {
	setTimeout(function(){calcTime(obj,fromdate);},10);
	setInterval(function(){calcTime(obj,fromdate);},1000);
}

function calcTime(obj,fromdate){
	var finaldate = new Date(fromdate);
	var myDate = new Date();// 当前时间
//	$zpy.comfirm(fromdate);
	
	var ts = Math.abs(finaldate - myDate);// 计算剩余的毫秒数
	var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);// 计算剩余的天数
	var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);// 计算剩余的小时数
	var mm = parseInt(ts / 1000 / 60 % 60, 10);// 计算剩余的分钟数
	var ss = parseInt(ts / 1000 % 60, 10);// 计算剩余的秒数
	
//	$zpy.comfirm(dd +":"+hh);
	dd = checkTime(dd);
	hh = checkTime(hh);
	mm = checkTime(mm);
	ss = checkTime(ss);
	
//	$zpy.comfirm($(obj).attr("id"));
	$(obj).html(
			"<b>" + dd + "</b>天<b>" + hh + "</b>小时<b>" + mm
					+ "</b>分<b>" + ss + "</b>秒");
}



/**
 * 补0
 * @param i
 * @returns
 */
function checkTime(i) {
	if (i < 10&&i>=0) {
		i = "0" + i;
	}else if(i<0){
		i = "00";
	}
	return i;
}

/**
 * 初始化分页控件
 * @param nodeObj
 * @param pNums 分多少页
 * @param pLen  分页显示长度 
 * @param PageCallback 回调函数
 */
function initPagingMenu(nodeObj,pNums,tLen,PageCallback){
	$(nodeObj).pagination(pNums, {
		callback : PageCallback,
		prev_text : '上一页',
		next_text : '下一页',
		items_per_page : 1,
		num_display_entries : tLen,
		current_page : 0,
		num_edge_entries : 1
	});
}

/**
 * post提交
 * @param url
 * @param args
 * @param target
 */
function sPost(url,args,target){
	if (!isNull(target)) {
		target = "target='"+target+"'"
	}else{
		target = "";
	}
	var formStr = "<form id='tForm' method='post' "+target+"></form>"
	$("#h_form").html(formStr);
	var form = $("#tForm");
    form.attr({"action":url});
    for (arg in args)
    {
        var input = $("<input type='hidden'>");
        input.attr({"name":arg});
        input.val(args[arg]);
        form.append(input);
    }
    form.submit();
}

/**   * 
 * 回到页面顶部   * @param acceleration 加速度  * @param time 时间间隔 (毫秒)
 * 
 */
function goTop(acceleration, time)
{ 
	
	acceleration = acceleration || 0.1; 
	time = time || 2; 
	var x1 = 0; var y1 = 0; var x2 = 0; var y2 = 0; var x3 = 0; var y3 = 0; 
	if (document.documentElement) 
	{ 
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0; 
	} 
	if (document.body) 
	{ 
		x2 = document.body.scrollLeft || 0; 
		y2 = document.body.scrollTop || 0;
	} 
	var x3 = window.scrollX || 0;
	var y3 = window.scrollY || 0; 
	// 滚动条到页面顶部的水平距离 
	var x = Math.max(x1, Math.max(x2, x3)); 
	// 滚动条到页面顶部的垂直距离 
	var y = Math.max(y1, Math.max(y2, y3)); 
	// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离 会越来越小
	var speed = 1 + acceleration; 
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed)); // 如果距离不为零, 继续调用迭代本函数 
	if(x > 0 || y > 0) 
	{ 
		var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
		window.setTimeout(invokeFunction, time); 
	}
} 

/**
 * 前台日志输出
 * @param msg
 */
function xire_console(msg){
//	console.log(msg);
}

/**
 * 重新制定F5功能
 */
document.onkeydown=function(event){
//	var e = event || window.event || arguments.callee.caller.arguments[0];
//	if (e.keyCode==116) {
		/*F5功能键修改*/
		
		/*初始化系统中的input框*/
//		inintInputValue();
		
//		location.replace(location.href);
//		return false;
//	}
}

/**
 * 初始化input框
 */
function inintInputValue(){
	/*产品页输入框初始化*/
	$("#search").val("");
}


function startmarquee(lh, speed, delay, objid) {
	var t;
	var p = false;
//	var o = document.getElementById("marqueebox" + index);
	var o = document.getElementById(objid);
	o.innerHTML += o.innerHTML;
	o.onmouseover = function() {
		p = true;
	};
	o.onmouseout = function() {
		p = false;
	};
	o.scrollTop = 0;
	function start() {
		t = setInterval(scrolling, speed);
		if (!p) {
			o.scrollTop += 1;
		}
	}
	function scrolling() {
		if (o.scrollTop % lh != 0) {
			o.scrollTop += 1;
			if (o.scrollTop >= o.scrollHeight / 2)
				o.scrollTop = 0;
		} else {
			clearInterval(t);
			setTimeout(start, delay);
		}
	}
	setTimeout(start, delay);
}

/************************ add by zyl  at 2015-02-10 begin****************************/
/**
 * 金额格式化
 * 12345格式化为12,345.00
 * 12345.6格式化为12,345.60
 * 12345.67格式化为 12,345.67 
 */
function fmoney(s, n) {
	var isNegativeNO = false;//负数判断
	s = s+"";
	if(s.indexOf("-")==0){
		s = s.replace("-","");
		isNegativeNO = true;
	}
	
	//如果n未输入，那么判断是否为小数，然后赋值小数位数n
	if(null==n || ""==n || "undefined"==n){
		var index = (""+s).split("").reverse().join("").indexOf(".");
		if(index>0){
			n=index;
		}else{
			n=0;
		}
	}
	
	n = n > 0 && n <= 20 ? n : 0;
	var l,r;
	if (n==0) {
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
		l = s.split("").reverse();
	}else{
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	}
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return (isNegativeNO ? "-":"") + (t.split("").reverse().join("") + (n==0?"":("." + r))) ;
}  
/**
 * 还原金额格式化
 * 12,345.67 还原为12345.67
 * @param s
 * @returns
 */
function rmoney(s) {
	return parseFloat(s.replace(/[^\d\.-]/g, ""));
}   

/**
 * 获取当前时间戳
 * @returns
 */
function getTimestamp(){
	return new Date().getTime();
}

/**
 * 添加日期格式化方法
 * @returns 
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 获取对象里面的值
 * 做为空校验
 */
function getVal(obj,defaultobj){
	return !isEmpty(obj)?obj:(!isEmpty(defaultobj)?defaultobj:{});
}
/**
 * 获取两个时间之间天数
 * @param endTime 
 * @param beginTime
 */
function getDays(endTime,beginTime){
	return ((new Date(endTime).getTime() - new Date(beginTime).getTime())/(24 * 3600 * 1000)) + 1;
}

/**
 * 初始倒计时
 * @param obj
 */
function countDown(obj){
	var time = $(obj).html();
	
//	$(obj).html(new Date(parseInt(time))+"123");
	
	
	initime($(obj), parseInt(time))
}


/**
 * 滚动条在Y轴滚动距离
 * @returns {Number}
 */
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
/**
 * 文档总高度
 * @returns {Number}
 */
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
/**
 * 浏览器窗口高度
 * @returns {Number}
 */
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}


/************************ add by zyl  at 2015-02-10 end *****************************/


/************************ add by xiaozujun at 2015-02-26 start **********************/
/**
 * 格式金额<br>
 * 如果金额格式正确，则返回金额
 * 否则返回空
 * 
 * @param amt
 */
function formatAmt(amt) {
	var reg = /^\d+((.)?\d+)?$/;
	if(reg.test(amt)) {
		return parseInt(amt);
	}
	return 0;
}

/**
 * 
 * @param reply
 * @param defaultMsg
 */
function handleError(reply, defaultMsg) {
	showError(getMsg(reply, defaultMsg));
}

function showError(msg) {
	//$zpy.comfirm(msg);
	$zpy.confirm(msg);
}

/**
 * 判断json返回结果是否成功
 * 
 * @param reply
 * @returns {Boolean}
 */
function isSuccess(reply) {
	return !isEmpty(reply) && !isEmpty(reply.message) &&  !isEmpty(reply.message.code) && reply.message.code == 'Y'
		|| !isEmpty(reply) && !isEmpty(reply.message) &&  !isEmpty(reply.message.type) && reply.message.type == 'Y';
	
}

/**
 * 判断json返回结果是否成功--gyl
 * 
 * @param reply
 * @returns {Boolean}
 */
function isSuccessNew(reply) {
	return !isEmpty(reply) && !isEmpty(reply.data) &&  !isEmpty(reply.code) && reply.code == 'Y'
		|| !isEmpty(reply) && !isEmpty(reply.data) &&  !isEmpty(reply.type) && reply.type == 'S';
	
}

/**
 * 获取请求信息
 * @param reply
 * @param defaultMsg 请求不到信息时返回默认信息
 * @returns
 */
function getMsg(reply, defaultMsg) {
	if (!isEmpty(reply) && !isEmpty(reply.message) && !isEmpty(reply.message.msg)) {
		return reply.message.msg;
	}
	return defaultMsg;
}

/**
 * 获取json请求的响应数据
 * @param reply
 * @returns
 */
function getData(reply) {
	if(isEmpty(reply.message) || isEmpty(reply.message.data)) {
		return {};
	} else {
		var data = reply.message.data;
		if(typeof data == 'string') {
			var jsonObj = s2j(reply.message.data);
			if($.isArray(jsonObj)) {
				return jsonObj.length > 0 ? jsonObj[0] : {};
			} 
			
			return jsonObj;
		} else if(typeof data == 'object') {
			if($.isArray(data)) {
				return data.length > 0 ? data[0] : {};
			}
			return data;
		}
		
		return {};
	}
}

/**
 * 获取json请求的响应数据--gyl
 * @param reply
 * @returns
 */
function getDataNew(reply) {
	if(isEmpty(reply.data)) {
		return {};
	} else {
		var data = reply.data;
		if(typeof data == 'string') {
			var jsonObj = s2j(reply.data);
			if($.isArray(jsonObj)) {
				return jsonObj.length > 0 ? jsonObj[0] : {};
			} 
			
			return jsonObj;
		} else if(typeof data == 'object') {
			if($.isArray(data)) {
				return data.length > 0 ? data[0] : {};
			}
			return data;
		}
		
		return {};
	}
}

/**
 * 获取json请求的响应数据
 * @param reply
 * @returns
 */
function getDataArray(reply) {
	if(isEmpty(reply.message) || isEmpty(reply.message.data)) {
		return [];
	} else {
		return s2j(reply.message.data);
	}
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
	if(obj == undefined || obj == null) {
		return true;
	}
	var type = typeof obj;
	return type != 'boolean' &&( (type == "string" && obj.length == 0) || (type != 'function' && obj.length == 0 ) || obj == [] || obj == {});
}
/**
 * 如果未登录则返回登录页
 * 
 */
function hasLogin(){
	var hUserId=$("#h_sUserId").val();
	if(hUserId=="null"||hUserId==""){
		window.location.href = ctx+"login/login.html";
	}
}
/************************ add by xiaozujun at 2015-02-26 end **********************/

/** 定义资配易全局对象 */
(function($, window){
	function zipeiyi(){
		var _this = this;
		this.config = {
				PRO_CYCLE_OPEN : "1", //开放期
				PRO_CYCLE_OPERATE : "2", //运作期
				PRO_CYCLE_END : "3",//完成期
					
				TRADE_TYPE_SUB : "01" //订单类型-订阅	
				
		};
		
		this.getPageParam = function(){
			return {"datatype":"all","pNums":"5","pStart":"0","tCount":"all","status":"10","condition":"0"};
		};
		
		this.getPaginator = function(){
			return {pageNo : 1, recordsPerPage : 5, queryTotal : true};
		};
		
		this.plugins = {};//插件对象
		
		this.Page = function() {
			this.pageNo;//当前页号
			this.totalPage;//总页数
			this.recordersPerPage;//每页显示分页数
		};	
		
		this.showInfo = function(msg) {
			//$zpy.comfirm(msg);
			$zpy.confirm(msg);
		};
		
		/**
		 * 获取日期字符串
		 * @param obj日期对象，支持数字、date、str
		 * @param split 分隔符, - 或者 /等, 默认-
		 */
		this.getDateStr = function(obj, split) {
			if(isEmpty(obj)){
				return null;
			}
			
			if(isEmpty(split)) {
				split = "-";
			}
			
			if(typeof obj == "number") {
				var dt = new Date(obj);
				return formatDate(dt, split);
			}
			
			if(typeof obj == "string") {
				return formatDateStr(obj, split);
			}
			
			if(!isEmpty(obj.time) ) {
				var _dt = new Date();
				_dt.setTime(obj.time);
				return formatDate(_dt, split);
			}
			
			return formatDate(obj, split);
			
			function formatDate(dateObj, split) {
				month = dateObj.getMonth() + 1;
				month = month < 10 ? "0" + month : "" + month;
				
				date = dateObj.getDate();
				date = date < 10 ? "0" + date : "" + date;
				
				var dStr = "" + dateObj.getFullYear() + split +  month + split + date;
				return dStr;
			}
			
			function formatDateStr(dateStr, split) {
				if(dateStr.length > 10) {
					dateStr = dateStr.substring(0, 10);
				}
				
				return dateStr.replace(/[^\d]/g, split);
				
			}
		};
		
		/**
		 * 获取日期字符串
		 * @param obj日期对象，支持数字、date、str
		 * @param split 分隔符, - 或者 /等, 默认-
		 */
		this.getDateTimeStr = function(obj) {
			if(isEmpty(obj)){
				return null;
			}
			
			if(typeof obj == "number") {
				var dt = new Date(obj);
				return formatDateTime(dt);
			}
			
			if(typeof obj != "object") {
				return obj;
			}
			
			if(!isEmpty(obj.time) ) {
				var _dt = new Date();
				_dt.setTime(obj.time);
				return formatDateTime(_dt);
			}
			
			return formatDateTime(dateObj);
			
			function formatDateTime(dateObj) {
				var month = dateObj.getMonth() + 1;
				month = month < 10 ? "0" + month : "" + month;
				
				var date = dateObj.getDate();
				date = date < 10 ? "0" + date : "" + date;
				
				var hours = dateObj.getHours();
				var minutes = dateObj.getMinutes();
				var seconds = dateObj.getSeconds();
				var _dSplit = "-";
				var _tSplit = ":";
				
				var dStr = "" + dateObj.getFullYear() + _dSplit +  month + _dSplit + date + " " + fillZero(hours) + _tSplit + fillZero(minutes) + _tSplit + fillZero(seconds);
				return dStr;
				
				function fillZero(num) {
					return  num < 10 ? "0" + num : "" + num; 
				}
			}
		};
		
		
		var dayMills = 1000 * 3600 * 24;//每一天的毫秒数
		
		/**
		 * 比较两个日期之间的时间差，返回相差天数
		 * @param date1 支持数据类型:数字、 字符串、日期
		 * @param date2 
		 */
		this.compareDays = function(date1, date2) {
			return parseInt((toMills(date1) - toMills(date2)) / dayMills);
			
			/**
			 * 转换为毫秒数
			 */
			function toMills(date){
				if(typeof date == "number") {
					return date;
				}
				if(typeof date == "string") {
					var _infos = date.split(/[^\d]/);
					if(_infos.length <= 3) {
						return 0;
					}
					
					var _dt = new Date();
					_dt.setFullYear(Number(_infos[0]), Number(_infos[1]) - 1, Number(_infos[2]));
					
					return _dt.getTime();
				}
				
				if(date.time) {
					return date.time;
				}
				
				
				return date.getTime();
			}
		};
		
		/**
		 * 格式化金额
		 * @param amt 金额
		 * @param decimal 保留的小数位数
		 */
		this.formatAmt = function(amt, decimal) {
			try{
				return Number(Number(amt).toFixed(decimal));
			}catch(e){
				return amt;
			}
		};
		
		/**
		 * 格式化金额，返回字符串
		 * @param amt 金额
		 * @param decimal 保留的小数位数
		 */
		this.formatAmtStr = function(amt, decimal) {
			try{
				return Number(amt).toFixed(decimal);
			}catch(e){
				return amt;
			}
		};
		
		var specialMail = {"gmail.com" : "gmail.google.com"};
		
		/**
		 * 跳转到邮箱页面
		 */
		this.toMail = function(mail) {
			try{
				var h = mail.split("@")[1].trim();
				var sH = specialMail[h];
				if(isEmpty(sH)) {
					sH = "mail." + h;
				}
				window.open("http://" + sH,"","","");
				//window.location.href = "http://" + sH;
			}catch(e){
				//ignore
			}
			
		};
		
		/**
		 * 跳转到邮箱页面
		 */
		this.getMailHost = function(mail) {
			try{
				var h = mail.split("@")[1].trim();
				var sH = specialMail[h];
				if(isEmpty(sH)) {
					sH = "mail." + h;
				}
				return "http://" + sH;
			}catch(e){
				//ignore
			}
			return "";
		};
		
		var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		
		/**
		 * 格式化日期<br>
		 * 返回: 2015/03/09 星期一 上午 12/11
		 */
		this.formatLocalDate = function(time) {
			var dt = null;
			try{
				dt = Number(time);
			} catch(e) {
				return time;
			}
			var date = new Date(dt);
			var datePart = $zpy.getDateStr(date, "/");
			var hours = date.getHours();
			var hStr = hours < 10 ? "0" + hours : "" + hours;
			var minutes = date.getMinutes();
			var minHstr = minutes < 10 ? "0" + minutes : "" + minutes;
			datePart = datePart + weeks[date.getDay()] + " " + (hours < 12 ? "上午" : "下午") + " " + hStr + ":" + minHstr;
			
			return datePart;
		};
		
		/** 券商编码与名称代码映射 */
		var capitalIdMap = {};
		
		/**
		 * @param capitalAcctList 资金账号列表
		 * 将资金账号编码与资金账号名称代码进行映射
		 */
		this.initCapitalIdMap = function(capitalAcctList) {
			if(!isEmpty(capitalAcctList)) {
				for(var i = 0; i < capitalAcctList.length; i ++) {
					var capAcct = capitalAcctList[i];
					capitalIdMap[capAcct.partId] = capAcct.partName;
				}
			}
		};
		
		/**
		 * 判断是否是招商证券
		 * @param partId 券商编号
		 * @return true-招商证券
		 */
		this.isZSPart = function (partId) {
			return "00" == capitalIdMap[partId];
		};
		
		/**
		 * 判断是否是中信证券
		 * @param partId 券商编号
		 * @return true-中信证券
		 */
		this.isZXPart = function (partId) {
			return "01" == capitalIdMap[partId];
		};
		/**
		 * 判断是否是中信建投证券
		 * @param partId 券商编号
		 * @return true-中信建投证券
		 */
		this.isZXJTPart = function (partId) {
			return "08" == capitalIdMap[partId];
		};
		/**
		 * 登录之后显示完整信息，否则只显示第一条信息，其他省略
		 * @param isLogin是否登录 
		 * @param val 值
		 * @param idx 当前索引
		 */
		this.showIfLogin = function(isLogin, val, idx, tUrl) {
			if(isLogin || idx == 0) {
				return val;
			}
			if(idx === 1) {
				return "<a href='../login/login.html?targetUrlCode=" + tUrl + "' style='color:#666' title='登录后查看，点击登录'>****</a>";
			}
			return "";
		};
		
		/**
		 * 登录之后换行<br>
		 * 当前记录不为最后一条记录 并且 (用户已经登录或者该记录为第一条记录)
		 */
		this.brIfLogin = function(isLogin, idx, len) {
			 return (idx != len - 1) && (isLogin || idx == 0);
		};
		
		/**
		 * 列表页异步读取数据mask蒙板显示隐藏方法
		 */
		this.loadListMarkFn = function(obj) {
			 var maskDom = $(".list_mask");
			 if(maskDom.length>0){
				 $(".list .slg .all").addClass("list_maskShowStyle");
				 maskDom.show();
				 if(obj=="hide"){
					 $(".list .slg .all").removeClass("list_maskShowStyle");
					 maskDom.hide();
					 return;
				 }
			 }
		};
		
		/**
		 * 向后台发送json请求
		 */
		this.postJSON = function(functionId, params, callback, completeCallback) {
			$.ajax({
				// 后台处理程序
				url : ctx + "manager/" + functionId,
				// 数据发送方式
				type : "post",
				// 接受数据格式
				dataType : "application/json",
				contentType : "application/json",
				// 要传递的数据
				data : JSON.stringify(params),
				// 回传函数
				timeout : 200000,// 设置请求超时时间（毫秒）。
				/*
				error : function(msg) {// 请求失败时调用函数。
					console.dir(msg);
					alert("error");
					//$zpy.comfirm(msg.responseText);
					//location.href = msg.responseText;
					//$zpy.comfirm("请求失败!" + msg.status+msg.statusText +json2str(msg));
				},
				success : function(replyObj) {
					alert('success');
					var reply = null;
//					try{
//						reply = JSON.parse(replyStr);
//					} catch(e) {
//						//解析返回数据异常
//						return;
//					}
				
					var code = replyObj.code;
					if (typeof(code)=="undefined") {
						return;
					}
					
					if (code == "AUTHOR001") {
						location.href = "../login/login.html";
						return;
					}
					
					// 请求成功后回调函数。
					if(code == "Y"){
						if (callback == undefined || callback == null) {
							afterDo(replyObj);
						} else if(typeof(callback) == "function"){
							callback(replyObj);
						} else {
							eval(callback + "(" + ts(replyObj) + ");");
						}
					}
					
				}*/
				complete : function(xmlHttpRequest, textStatus){
					//alert(textStatus);
					//console.dir(xmlHttpRequest);
					if(xmlHttpRequest.status==200){
						var responseText = xmlHttpRequest.responseText;
						var replyObj = null;
						try{
							replyObj = JSON.parse(responseText);
						} catch(e) {
							//解析返回数据异常
							return;
						}
						var code = replyObj.code;
						if (typeof(code)=="undefined") {
							return;
						}
						
						if (code == "AUTHOR001") {
							location.href = "../login/login.html";
							return;
						}
						
						// 请求成功后回调函数。
//						if(code == "Y"){
							if (callback == undefined || callback == null) {
								afterDo(replyObj);
							} else if(typeof(callback) == "function"){
								callback(replyObj);
							} else {
								eval(callback + "(" + ts(replyObj) + ");");
							}
//						}
					}
					
					//执行completeCallback，无论返回状态如何，均执行
					if(completeCallback != null && completeCallback != undefined && completeCallback != ""){
						if (typeof(completeCallback) == "function"){
							completeCallback();
						} else {
							eval(completeCallback + "();");
						}
					}
				}
			});
		};
		
	}
	
	window.$zpy = new zipeiyi();
})(jQuery,window);


