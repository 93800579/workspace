var storage = window.sessionStorage;
var userInfo={};
$(function() {
	//初始化校验码
	//initSecurityCode();	
	//显示不同背景图片
	//$(".loginMain").addClass("loginMain_bg"+randomNum());
});

/**
 * 1.保存用户数据到session
 * 2.跳转首页
 */
function saveToSession(arrObj){
//	var urlname = JSON.parse(storage.getItem("urlname"));
	var url = "";
	var sData = {};
	arrObj.targetUrlCode = targetUrlCode;
	$.post("loginSession.jsp",arrObj,function(data){
		//$zpy.comfirm(data+"##");
		var reply = JSON.parse(data);
		var targetUrl = reply.targetUrl;
		if(null==targetUrl||""==targetUrl||targetUrl==undefined){
			url = ctx+"index.html";
			location.href=url;
			//sPost(url,sData);
		}else{
			url = targetUrl;
			if (null!=url&&""!=url&&url!=undefined) {
				//window.location.href=url;
				var proId = storage.getItem("proId");
				if (proId!=""||proId!="null") {
					sData["obj"]=proId;
				}
				sPost(url,sData);
			}
		}
	});
}

var chk=0;
$(function() {
	// 表单'onkeyup'验证事件
	$(".fm input").bind("keyup",function(event) {
		if(event.keyCode==13) {
			return;
		}
		if($(this).val()==""){
			validateStyleFn(id,null,"");
			return;
		}
		var id=$(this).attr("id");
		if(id=="yzm"&&!validate_yzm()){
			return false;
		}
		validateStyleFn(id,null,"");
	});
	//获取焦点时输入框颜色切换
	$("#form input").on("focus blur",function(event) {
		var id=$(this).attr("id");
		if(event.type=="focus"){
			toInputStatus($(this).parent(),true);
		}else{
			toInputStatus($(this).parent(),false);
		}
		
	});
	// 验证码HOVER事件
	$(".tip").hover(function() {
		$(".showOpa").css("display", "block");
	}, function() {
		$(".showOpa").css("display", "none");
	});
	// 点击更换验证码事件
	$(".showOpa").click(function() {
		initSecurityCode();
		$("#yzm").val("");
		validateStyleFn("yzm",null,"");
	});
	// checkBox勾选状态替换
	$("#changeChk").click(function() {
		if (chk == 0) {
			$(this).html("");
			$(".che").removeAttr("checked");
			chk = 1;
			return;
		}
		if (chk == 1) {
			$(this).html("<img src='../resources/imgs/check.png'/>");
			$(".che").attr("checked","checked");
			chk = 0;
			return;
		}
	});
	//点击登录
	$("#submit").click(function(e) {
        toLogin("#submit");
    });
});
/** 输入状态边框颜色 */
function toInputStatus(wrap, hasLabel) {
		var t = $(wrap);
		if(hasLabel) {
			t.addClass("inputDom_blur");
		}else{
			t.removeClass("inputDom_blur");
		}
	};
/**
 * 登录用户名验证
 * @returns {Boolean}
 */
function  validateRegId(){
	var regid=$("#reg_id").val();
	var regStr = /^[a-zA-Z0-9_@.]{1,}$/;
    var msg=$("#reg_id").parent().find(".msgbox");
   if(regid==""){
		validateStyleFn("reg_id",false,"请输入您的用户名，手机号或者邮箱！");
		return false;
	}
	if(regid.length<3){
		validateStyleFn("reg_id",false,"用户名不能少于3位！");
		return false;
	}
	if(!regid.match(regStr)){
		validateStyleFn("reg_id",false,"用户名只能含有数字、字母、下划线、@和点！");
		return false;
	}
	validateStyleFn("reg_id",null,"");
	return true;
}
/**
 * 登录密码验证
 * @returns {Boolean}
 */
function validatePassword(){
	 var pwd = $("#reg_pwd").val();
	 var msg = $("#reg_pwd").parent().find(".msgbox");
		if(pwd==""){
			validateStyleFn("reg_pwd",false,"请输入密码！");
			return false;
		}
		if(pwd.length<3){
			validateStyleFn("reg_pwd",false,"密码输入错误，长度至少为3位！");
			return false;
		}
		validateStyleFn("reg_pwd",null,"");
		return true;
}
/**
 * 验证码校验
 * @returns {Boolean}
 */
function validate_yzm(){
	if(!before_yzm()){
		return false;
	}
	var yzm=$("#yzm").val().toUpperCase();
	var msg=$("#yzm").parent().find(".msgbox");
    $.post(ctx+"common/jsp/validate.jsp",{"secCode":yzm},function(d){
			var jsonObj = s2j(d);
			if ("Y"==jsonObj.code) {
				$("#h_sCodeFlag").val(jsonObj.code);
				validateStyleFn("yzm",null,"");
			}else{
				validateStyleFn("yzm",false,"验证码输入错误！");
			}
		
	     });
  
}
/**
 * 检验验证码是否是四位长度
 */
function before_yzm(){
	var yzm=$("#yzm").val().toUpperCase();
	var msg=$("#yzm").parent().find(".msgbox");
	//if(isNull(yzm)||yzm.length<4||yzm.length>=5){
	if(isNull(yzm)||yzm.length>=5){
		validateStyleFn("yzm",false,"请填写四位验证码！");
		return false;
	}else if(yzm.length<4){
		validateStyleFn("yzm",false,"请填写四位验证码！");
		return false;
	}
	validateStyleFn("yzm",null,"");
	return true;
}

/**
 * 监听Enter键，按键按下登陆验证
 */
$(document).keypress(function(event) {
	if (event.keyCode==13){
		toLogin("#submit");
	}
});
/**
 * 登录
 * @returns {Boolean}
 */
function toLogin(com){
	//验证用户名,密码,验证码
	if(!validateRegId()||!validatePassword()||!before_yzm()){
		//$zpy.focusOnError($(com).parents("form:eq(0)"));
		return false;
	}
	var yzm=$("#yzm").val().toUpperCase();
	var msg=$("#yzm").parent().find(".msgbox");
	  $.post(ctx+"common/jsp/validate.jsp",{"secCode":yzm},function(d){
			var jsonObj = s2j(d);
			//回调函数返回值'Y'表示验证码通过 
			if ("Y"==jsonObj.code) {
				$("#h_sCodeFlag").val(jsonObj.code);
				msg.parent().css("border-color","");
				msg.fadeOut(150);
				var regist_id =  $("#reg_id").val();
				var regist_pwd = $("#reg_pwd").val();
				var hRegistPwd = $("#h_registPwd").val();
				data = {"regist_id" : regist_id,"regist_pwd" : regist_pwd,"hRegistPwd":hRegistPwd};
				//调用登录接口
				dopost('userregistManage', 'finduserinfo', data);
			}else{
				validateStyleFn("yzm",false,"验证码输入错误！");
			}
		
	     });
}
/**
 * 将用户登录失败次数置为0
 */
function initLoginMax(){
	dopost('userregistManage', 'loginsuccess', userInfo);
}
/**
 * 保存Cookie
 */
function saveCookie(){
	if($(".che").attr("checked")=="checked"){
		var base64 = new Base64();   
		var enreid = base64.encode(userInfo.registid); 
		var enPwd =  base64.encode(userInfo.registPwd);
		//将用户名和密码存放在cookie
		$.cookie('registid',enreid,{expires:14,path:"/"});
//	    $.cookie('registpwd',enPwd,{expires:7,path:"/xire_b2c"});
	}else{
		//不勾选时清空cookie
		$.cookie('registid',null,{expires:0,path:"/"});
	}

	/*
	 * 获取缓存用户信息的方式 var storage = window.localStorage; var usermessage =
	 * JSON.parse(storage.getItem("usermessage"));
	 * $zpy.comfirm("========="+usermessage.registid);
	 */
	//用户登录成功跳转首页
	saveToSession(userInfo);
}
function afterDo(d) {
	/**
	 * 登录回调
	 */
	if (d.action == 'userregistManage' && d.operate == 'finduserinfo') {
		var s=eval(d);
		var j = s2j(d.message.data);
		////console.info(s);
		//用户名异常信息
	 if(s.message.code=='N'){
		if (j.errortype == 'iderror') {
			validateStyleFn("reg_id",false,j.errorinfo);
			return false;
		}
	
		//用户密码异常信息
		if (j.errortype == 'pwderror') {
			validateStyleFn("reg_pwd",false,j.errorinfo);
			return false;
		}
		//00是已被锁定,01是正常
		if (j.is_locked==undefined||j.is_locked == "00") {
			validateStyleFn("reg_id",false,"Sorry！您的账号已被锁定，请于明日00:00时后进行登陆操作！");
			return false;
		}
	     //非法字符
//        if(!isEmpty(d.message.msg)){
//	       $zpy.comfirm(s.message.msg) ;
//	        return false;
//	    }
	}
		if(s.message.code=="Y"){
			userInfo.userid=j.user_id;
			userInfo.registid=j.regist_id;
			userInfo.registPwd=j.regist_pwd;
			userInfo.vtUserId=j.vt_user_id;
			storage.setItem("usermessage", JSON.stringify(userInfo));
			initLoginMax();
			validateStyleFn("reg_id",null,"");
			return true;
		}
	}
	if (d.action == 'userregistManage' && d.operate == 'loginsuccess') {
		saveCookie();
		}
}
/**
 * 公用改变验证结果样式方法
 */
function validateStyleFn(id,isOk,text) {
	var inputId=$("#"+id);
	if(isOk===true){ //验证通过
		inputId.parents("li").find(".errorText").hide();
		inputId.parents("li").find(".inputDom").removeClass("errorStyle");
		inputId.parents("li").find(".hasError").removeClass("no");
		inputId.parents("li").find(".hasError").addClass("yes");
	}else if(isOk===false){ //验证失败
		inputId.parents("li").find(".errorText").text(text).show();
		inputId.parents("li").find(".inputDom").addClass("errorStyle");
		inputId.parents("li").find(".hasError").addClass("no");
		inputId.parents("li").find(".hasError").removeClass("yes");
	}else if(isOk===null){ //恢复默认样式
		inputId.parents("li").find(".errorText").hide();
		inputId.parents("li").find(".inputDom").removeClass("errorStyle");
		inputId.parents("li").find(".hasError").removeClass("no");
		inputId.parents("li").find(".hasError").removeClass("yes");
	}
};
/**
 * 获取1～3随机整数，显示不同背景
 */
function randomNum(){
	var num = Math.ceil(Math.random()*3);
	return num;
}

