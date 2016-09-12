var chk=0;
var phoneall="";
//手机验证码
var phonecode="";
//验证手机是否可用
var  validate_phone=false;
//手机验证码是否正确 
var validate_yzm=false;
//图片验证码是否正确 
var validate_secCodeHas=false;
//判断是否点击过短信验证码按钮
var validate_clickYzmHas=false;
$(function() {
	$("form#form")[0].reset();
	//初始化校验码
	//initSecurityCode();	
	//注册按钮点击事件
	$("#submit").click(function(e) {
        e.stopPropagation();
		e.preventDefault();
		newUserRegist(this);
    });
	// 表单获得焦点事件
	//$(".pla input").bind("focus",function(){
		//$(this).parent().css({'border-color' : '#999999'});
		//$(this).parent().parent().find("label").css("background","#0366c3");
		//$(this).parent().find(".msgbox").fadeOut(150);
	//});
	//提交按钮,和获取验证码按钮Hover事件
	//$(".tip,.submit").hover(function(){
//    //此外判断当悬浮在注册提交按钮时如果已经置灰则不触发
//		if($(this).hasClass("unHover")){
//			return false;
//		}
//		$(this).css("background-color","#046ec7");
//	},function(){
//		if($(this).hasClass("unHover")){
//			return false;
//		}
//		$(this).css("background-color","#0367c3");
//	});
/**
 * 表单Keyup事件(处理验证表单数据)
 */
	$("#form input").bind("keyup",function(event) {
		if(isEmpty(event)&&event.keyCode==13) {
			return;
		}
		
		var id=$(this).attr("id");
		/*if($(this).val()==""){
			$zpy.toInputStatus($(this).parent());
			if(id=="email") {
				$(this).parent().find(".msgbox").fadeOut(150);
			}
			
			return;
		}
		if(id=="reg_id"&&!validateRegId()){
			return false;
		}
		if(id=="reg_pwd"&&!validatePassword()){
			return false;
		}
		if(id=="reg_pwd2"&&!validatepwd_2()){
			return false;
		}
		if(id=="email"&&!validateEmail()){
			return false;
		}
		if(id=="secCode"&&!validate_secCode()){
			return false;
		}
		if(id=="phone"&&!validatePhone()){
			return false;
		}
		if(id=="yzm"){
			validateStyleFn(id,null,"");
			return false;
		}*/
		if($(this).val()==""){
			validateStyleFn(id,null,"");
		}
	});
	//获取焦点时输入框颜色切换
	$("#form input").on("focus blur",function(event) {
		var id=$(this).attr("id");
		if(event.type=="focus"){
			toInputStatus($(this).parent(),true);
		}else{
			toInputStatus($(this).parent(),false);
			if(id=="reg_id"&&!validateRegId()){
				if($(this).val()==""){
					validateStyleFn(id,null,"");
				}
			}
			if(id=="reg_pwd"){
				if($(this).val()==""){
					validateStyleFn(id,null,"");
					return;
				}
				validatePassword();
			}
			if(id=="reg_pwd2"){
				if($(this).val()==""){
					validateStyleFn(id,null,"");
					return;
				}
				validatepwd_2();
			}
			if(id=="email"){
				if($(this).val()==""){
					validateStyleFn(id,null,"");
					return;
				}
				validateEmail();
			}
		}
		
	});
	// 验证码HOVER事件
	$(".secCode").hover(function() {
		$(".showOpa").css("display", "block");
	}, function() {
		$(".showOpa").css("display", "none");
	});
	// 点击更换验证码事件
	$(".showOpa").click(function() {
		//createCode_new();
		initSecurityCode();
		$("#secCode").val("");
		validateStyleFn("secCode",null,"");
		validate_secCodeHas = false;
	});
	// 点击获取手机验证码事件
	$(".phoneCoce").click(function() {
		validate_clickYzmHas=true;
		if(!validate_secCodeHas){
			if(!validate_secCode()){
				return false;
			}
		}
		if(!validatePhone()){
			return false;
		}
		$(".phoneCoce").hide();
		$(".tip_gray").html("60s").show();
		/*计时器-begin*/
		var time = 60;
		var timer = setInterval(function(){
			time--;
			$(".tip_gray").html(time+"s");
			if(time < 0){
				$(".tip_gray").html("获取短信校验码").hide();//隐藏倒计时按钮
				$(".phoneCoce").show();
//			$("#yzm").val("");//清除验证码
				clearInterval(timer);
			}
		},1000);
		/*计时器-end*/
		//生成6位随机验证码
		phonecode="";
	/*	for (var i = 0; i < 6; i++) {
			phonecode += parseInt(Math.random()*9).toString();
        }*/
		var contact_phone=$("#phone").val();
		//图片验证码
		var secCode=$("#secCode").val();
		//data={contact_phone:contact_phone,phonecodenum:phonecodenum};
		//提示验证码：只发布测试环境，UAT环境需把这行代码注释
		dopost('userregistManage','phonecodenum',{contact_phone:contact_phone,"codeType":"phoneCode","secCode":secCode});//暂不调用短信接口发送短信，改成在页面回显验证码
	});
	// checkBox勾选状态替换
	$("#changeChk").click(function() {
		if (chk == 0) {
			$(this).html("");
			$(".che").removeAttr("checked");
			$(".submit").addClass("unHover").css({"background-color":"#cccccc","color":"#808080","cursor":"default"}).removeAttr("onclick").unbind("click");
			
			chk = 1;
			return;
		}
		if (chk == 1) {
			$(this).html("<img src='../resources/imgs/check.png'/>");
			$(".che").attr("checked","checked");
			$(".submit").removeClass("unHover").attr("style","").attr("onclick","newUserRegist();").bind("click");
			chk = 0;
			return;
		}
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
 * 检验密码强度
 */
function ag(){
		var val = $("#reg_pwd").val();
		var level = 0;
		//密码强度 '01'-弱,'02'-中,'03'-强
		var pwdstr=$("#pwdstr");
		if(val.length<6){
			level = 0;
		}
		if (val.match(/[a-z]/g)) {
			level++;
		}
		if (val.match(/[0-9]/g)) {
			level++;
		}
		if (val.match(/(.[^a-z0-9\s])/g)) {
			level++;
		}
		if (val.length < 6) {
			level = 0;
		}
		if (level > 3) {
			level = 3;
		}
		if(level==0){
			$(".passStrongDom li[name=one]").removeAttr("class");
			$(".passStrongDom li[name=two]").removeAttr("class");
			$(".passStrongDom li[name=three]").removeAttr("class");
		}
		//弱
       if(level==1){
    		$(".passStrongDom li[name=one]").attr("class","weak");
			$(".passStrongDom li[name=two]").attr("class"," ");
			$(".passStrongDom li[name=three]").attr("class"," ");
			pwdstr.val("01");
       }
       //中
       if(level==2){  
		   	$(".passStrongDom li[name=one]").attr("class","medium");
			$(".passStrongDom li[name=two]").attr("class","medium");
			$(".passStrongDom li[name=three]").attr("class"," ");
			pwdstr.val("02");
       }
       //强
       if(level==3){
    		$(".passStrongDom li[name=one]").attr("class","strong");
			$(".passStrongDom li[name=two]").attr("class","strong");
			$(".passStrongDom li[name=three]").attr("class","strong");
			pwdstr.val("03");
       }
}

/**
 * 注册用户名验证
 * @returns {Boolean}
 */
function  validateRegId(){
	var regid=$("#reg_id").val();
	var regStr = /^[a-zA-Z0-9_@.]{1,}$/;
	var parentDom=$("#reg_id").parents("li");
	if(isNull(regid)){
		//此处是表单验证信息提示框的效果,后面所有都一样
		validateStyleFn("reg_id",false,"请输入您的用户名，手机号或者邮箱！");
		return false;
	}
	if(regid.length<6){
		validateStyleFn("reg_id",false,"用户名长度不能少于6位！");
		return false;
	}
	if(regid.length>18){
		validateStyleFn("reg_id",false,"用户名长度不能大于18位！");
		return false;
	}
	if(!regid.match(regStr)){
		validateStyleFn("reg_id",false,"用户名只能含有数字、字母、下划线、@和点！");
		return false;
	}
	validateStyleFn("reg_id",true,"");
	//后端服务器验证是否重复用户名
	validateRegId_ajax();
	return true;
}
/**
 * 注册用户名验证，后端服务器验证是否重复用户名
 * @returns {Boolean}
 */
function  validateRegId_ajax(){
	var regid=$("#reg_id").val();
	dopost("userregistManage","findbyregistname",{"regist_id":regid});
}
	
/**
 * 注册密码验证
 * @returns {Boolean}
 */
function validatePassword(){
	 var pwd = $("#reg_pwd").val();
	 var parentDom=$("#reg_pwd").parents("li");
		if(isNull(pwd)){
		   validateStyleFn("reg_pwd",false,"请输入注册密码，注意大小写！");
		   return false;
		}
		if(pwd.length<6){
			validateStyleFn("reg_pwd",false,"密码输入错误，长度至少为6位！");
			return false;
		}
		if(pwd.length>18){
			validateStyleFn("reg_pwd",false,"密码输入错误，长度小于等于18位！");
			return false;
		}
		if(pwd.match(/\s/g)){
			validateStyleFn("reg_pwd",false,"密码输入错误，不能有空格！");
			return false;
		}
		if($("#pwdstr").val()=="01"){
			validateStyleFn("reg_pwd",false,"密码请至少包含一个英文字母和一个数字！");
			return false;
		}
		validateStyleFn("reg_pwd",true,"");
		return true;
}

/**
 * 第二次密码验证
 */
function validatepwd_2(){
	 var pwd = $("#reg_pwd").val();
	 var pwd2= $("#reg_pwd2").val();
	 var parentDom=$("#reg_pwd2").parents("li");
	 if(!validatePassword()){
		 return false;
	 }
	 if(isNull(pwd2)){
		validateStyleFn("reg_pwd2",false,"请再次确认密码！");

	 	return false;
	 }
	 if(pwd!==pwd2){
		validateStyleFn("reg_pwd2",false,"两次输入密码不一致，请重新输入！");
		return false;
	 }
	validateStyleFn("reg_pwd2",true,"");
	 return true;
}
/**
 * 邮箱验证
 * @returns {Boolean}
 */
function validateEmail(){
	var email=$("#email").val();
	var parentDom=$("#email").parents("li");
	if(isNull(email)){
		validateStyleFn("email",false,"请填写有效的邮箱地址！");
	 	return false;
	 }
    //邮箱不为空进行格式验证
	if(!isNull(email)&&!REGEX_EMAIL.test(email)){
		validateStyleFn("email",false,"请填写有效的邮箱地址！");
		return false;
	}
	validateStyleFn("email",true,"");
	return true;
}
/**
 * 手机号验证
 * @returns {Boolean} 
 */
function validatePhone(){
	var phone=$("#phone").val();
	//if(phone==phoneall&&validate_phone==true){
//		return true;
//	}
	//验证手机之前将获取验证码按钮置灰
	$(".tip_gray").show();
	$(".phoneCoce").hide();
	validate_yzm=false;
	var parentDom=$("#phone").parents("li");
	if(isNull(phone)){
		validateStyleFn("phone",false,"请输入您的手机号！");
		return false;
	}
	if(!REGEX_PHONE.test(phone)){
		/*if(parentDom.find(".errorText").is(":hidden")===false){
			return false;
		}*/
		validateStyleFn("phone",false,"请填写有效手机号！");
		return false;
	}
	if($(".tip_gray").html()=="0s"||$(".tip_gray").html()=="获取短信校验码"){
		$(".tip_gray").hide();
		$(".phoneCoce").show();
	}
	//后台验证手机
	findByPhone();
	validateStyleFn("phone",true,"");
	return true;
}
/**
 * 验证手机是否已存在
 */
function findByPhone(){
	var phone=$("#phone").val();
	dopost("userregistManage","findByPhone",{"contact_phone":phone});
}
/**
 * 手机验证码校验
 * @returns {Boolean}
 */
function validatePhoneCode(){
	if(validate_yzm==true){
		return true;
	}
	var phoneyzm=$("#yzm").val();
	var parentDom=$("#yzm").parents("li");
	if(isNull(phoneyzm)||phoneyzm.length<6){
		validateStyleFn("yzm",false,"请输入六位短信校验码！");
		return false;
	}
	if(isNull(phoneall)){
		validateStyleFn("yzm",false,"验证码已过期，请重新获取！");
		return false;
	}
/*	if(phoneyzm!=phonecode){
		msg.css({"top" : "10px","display" : "block"}).animate({"top" : "0px"}, 150).find(".msgdiv").html("验证码填写错误!");
		msg.parent().css("border-color","#c1272d");
		return false;
	}*/
	//dopost("userregistManage", "validatePhoneCode", {'phoneCode' : phoneyzm});
	validateStyleFn("yzm",true,"用户名长度不能少于6位！");
	return true;
}
function ckphone(){
	if(!isNull(phoneall)){
		var contact_phone=$("#phone").val();//获取手机号
		var parentDom=$("#yzm").parents("li");
		if(contact_phone!=phoneall){
			validateStyleFn("yzm",false,"请重新获取短信校验码！");
			return false;
		}
	}
	validateStyleFn("yzm",true,"");
	return true;
}

/**
 * 监听Enter键，按键按下登陆验证
 */
$(document).keypress(function(event) {
	if (isEmpty(event)&&event.keyCode==13){
		newUserRegist($("#submit"));
	}
});

/**
 * 新用户注册
 * @returns {Boolean}
 */
function newUserRegist(com){
	//数据校验
	if(!validateRegId()||!validatePassword()||!validatepwd_2()||/*!validatePhone()||!validatePhoneCode()||*/!validateEmail()){
		focusOnError();
		return false;
	}
	/*if(!validate_secCodeHas){
		if(!validate_secCode()){
			focusOnError();
			return false;
		}
	}*/
/* 	if(validate_phone==false||phoneall!=$("#phone").val()){
		validatePhone();
		return false;
	}  */
/*	if(!validatePhoneCode()){
		return false;
	}*/
	if(!ckphone()){
		return false;
	}
　	//获取用户数据
	var regist_id=$("#reg_id").val();
	var regist_pwd=$("#reg_pwd").val();
	var contact_email=$("#email").val();
	var contact_phone=$("#phone").val();
	var pwdstr = $("#pwdstr").val();
	var phoneCode=$("#yzm").val(); 
	var secCode=$("#secCode").val(); 
	
	//发送请求
	var data = {
		'regist_id' : regist_id,
		'regist_pwd' : regist_pwd,
		'pwd_strth':pwdstr,
		'contact_phone' : contact_phone,
		'phoneCode':phoneCode,
		'contact_email' : contact_email,
		'secCode':secCode
	}
	dopost('userregistManage', 'newUserRegist', data);
}

function afterDo(d){
	if(!validateReply(d)) {
		//focusOnError();
	}
}

function validateReply(d){
	var s=eval(d);
	var j = s2j(d.message.data);
	//后台验证用户名是否存在
	if(d.action=='userregistManage'&&d.operate=='findbyregistname'){ 
		if(s.message.data!="[]"){
			validateStyleFn("reg_id",false,"用户名已存在！");
			return false;	
		}
	}
	//新用户注册回调
	if(d.action=='userregistManage'&&d.operate=='newUserRegist'){ 
		//注册失败返回信息
		if(s.message.code=='N'){
		//	//console.info(j.errortype+'   '+j.errorinfo);
			if(j.errortype=="iderror"){
				validateStyleFn("reg_id",false,j.errorinfo);
				return false;	
			}
            if(j.errortype=="pwderror"){
				validateStyleFn("reg_pwd",false,j.errorinfo);
    			return false;
			}
            if(j.errortype=="phoneError"){
				validateStyleFn("phone",false,j.errorinfo);
    			return false;
			}
            if(j.errortype=="yzmError"){
				validateStyleFn("yzm",false,j.errorinfo);
    			return false;
			}
            if(j.errortype=="emailError"){			
				validateStyleFn("email",false,j.errorinfo);
    			return false;
			}
            //非法字符
            if(s.message.msg!==undefined){
 	           $zpy.confirm(s.message.msg) ;
 	        }
		}
		//注册成功页面跳转
		if(isSuccess(d)){
			var data = getData(d);
			var registId = data.registId;
			var userId = data.userId;
			var vtUserId = data.vtUserId;
			var arrObj = {"registid":registId,"userid":userId,"vtUserId":vtUserId};
			//注册成功，直接登录
			saveToSession(arrObj);
		}
	}
   //手机号验证回调
 	if(d.action=='userregistManage'&&d.operate=='findByPhone'){
		//手机验证失败返回信息
		if(s.message.code=='N'){
		//	//console.info(j.errortype+'   '+j.errorinfo);
			validate_phone=false;
	        if(j.errortype=="phoneError"){
	        	setTimeout(function(){
	        		$(".tip_gray").show();
					$(".phoneCoce").hide();
					validateStyleFn("phone",false,j.errorinfo);
	        		//验证码不能点击
//	        		$(".tip_gray").css("display","block");
//	        		$(".tip").css("display","none");
//	        		validate_yzm = false;
	        	}, 300);
				return false;
			}
		}
		//手机号可以使用
		if(s.message.code=='Y'){
			validate_phone=true;
			phoneall=$("#phone").val();
			//validatePhoneCode();
			if(validate_clickYzmHas===false){
				if($(".tip_gray").html()=="0s"||$(".tip_gray").html()=="获取短信校验码"){
					$(".tip_gray").hide();
					$(".phoneCoce").show();
				}
			}else{
				$(".tip_gray").show();
				$(".phoneCoce").hide();
			}
			validate_clickYzmHas=false;
		}
 	}
	//发送验证码回调
	if(d.action=='userregistManage'&&d.operate=='phonecodenum'){
		var s = eval(d);
		if(d.message.code != 'Y') {
			var data = JSON.parse(d.message.data);
			//验证码失败后，换一个验证码
			if(data.errortype == 'phoneSecCodeError'){
//				var msg=$("#secCode").parent().find(".msgbox");
//				msg.css({"top" : "10px","display" : "block"}).animate({"top" : "0px"}, 150).find(".msgdiv").html(data.errorinfo);
//				msg.parent().css("border-color","#c1272d");
			}
		} else {
			var _j= s2j(d.message.data);
			//发送成功反回 Y,失败返回  N
			phonecode=_j[0].phonecode;
			phoneall=$("#phone").val();
			var isSendMessage = _j[0].isSendMessage;
			if(!isSendMessage) {
				alert(phonecode);
			}
		}
		initSecurityCode();	
		$("#secCode").val("");
		validateStyleFn("secCode",null,"");
		validate_secCodeHas = false;
		
 	}
	//检验手机验证码回调
	if(d.action=='userregistManage'&&d.operate=='validatePhoneCode'){
		var s = eval(d);
		var j=s2j(d.message.data);
		//校验成功返回 Y,失败返回  N
	if(s.message.code=="N"){
		 if(j.errortype=="yzmError"){
			 validateStyleFn("yzm",false,j.errorinfo);
			 validate_yzm=false;
		 }
	}
	if(s.message.code=="Y"){
		validateStyleFn("yzm",true,"");
		validate_yzm=true;
	}
 	}
}


/**
 * 1.保存用户数据到session
 * 2.跳转首页
 */
function saveToSession(arrObj){
	var url = "";
	$.post(ctx +"login/loginSession.jsp",arrObj,function(data){
		//url = ctx+"regist/registsuccess.html";
		url = ctx+"regist/regist_second.html";
		location.href=url;
	});
}
/**
 * 验证码校验
 * @returns {Boolean}
 */
function validate_secCode(){
	validate_secCodeHas = false;
	if(!before_secCode()){
		return false;
	}
	var secCode=$("#secCode").val().toUpperCase();
	//var msg=$("#secCode").parent().find(".msgbox");
    $.post(ctx+"common/jsp/validate.jsp",{"secCode":secCode},function(d){
			var jsonObj = s2j(d);
			if ("Y"==jsonObj.code) {
				$("#h_sCodeFlag").val(jsonObj.code);
				//msg.parent().css("border-color","");
				//msg.fadeOut(150);
				validateStyleFn("secCode",true,"");
				validate_secCodeHas = true;
			}else{
				validateStyleFn("secCode",false,"验证码输入错误！");
				validate_secCodeHas = false;
			}
		
	     });
  
}
/**
 * 检验验证码是否是四位长度
 */
function before_secCode(){
	var secCode=$("#secCode").val().toUpperCase();
	//var msg=$("#secCode").parent().find(".msgbox");
	//if(isNull(secCode)||secCode.length<4||secCode.length>=5){
	if(isNull(secCode)||secCode.length>=5){
		validateStyleFn("secCode",false,"请填写四位验证码！");
		return false;
	}else if(secCode.length<4){
		validateStyleFn("secCode",false,"请填写四位验证码！");
		return false;
	}
	validateStyleFn("secCode",true,"");
	return true;
}
/**
 * 解决IE9以下placeholder插件BUG
 */
$(document).ready(function(){
	setTimeout(function(){	
		$('input').focus().blur(); 
	},20);
	setTimeout(function(){	
		$('input[name=username]').focus();
	},300);
});
/**
 * 查找第一个错误输入框，并赋予其焦点
 */
function focusOnError() {
	var _this = $("form:eq(0)");
	var _msgbox = _this.find(".errorText:visible:eq(0)");
	if(isEmpty(_msgbox)) {
		return;
	}
	var _p = _msgbox.parents("li:eq(0)");
	_p.find("input:eq(0)").focus();
};
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




