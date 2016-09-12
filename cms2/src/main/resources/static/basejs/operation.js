var op = {};
//
op.saveParams=function(key,value){
	sessionStorage.clear(); 
	sessionStorage.setItem(key,value);
};
op.getParams = function(name,url){
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(url.indexOf("?")+1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		}
	}
	return theRequest[name]||'';
};

//保存表单
op.saveForm = function(url,formid,callback){
	var dd = $("#"+formid).serializeJSON();
	console.log(dd);
	$.ajax({
		url: url,
		type: 'post',
		contentType:'application/json',
		data: dd,
		success: function (data) {
			console.log(data);
			if(callback){
				callback(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* Act on the event */
			try{
			console.log(textStatus+errorThrown);
			}
			catch(e){
				//alert(e);
			}
				//alert("error");
			}
		});
	
};
//获取列表，需要在callback中处理数据
op.list = function(url,callback){
	$.ajax({
		url: url,
		type: 'get',
		contentType:'application/json',
		success: function (data) {
			if(callback){
				callback(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* Act on the event */
			console.log(textStatus+errorThrown);
			alert("error");
		}
	});
};
//删除需要ｕｒｌ是/code/{id}这种类型
op.deleteOne = function(url,callback){
	$.ajax({
		url:url,
		type:'delete',
		success:function(data){
			if(callback){
				callback(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* Act on the event */
			console.log(textStatus+errorThrown);
				//alert("error");
			}

		});
};
//更新 需要ｕｒｌ是/code/{id}这种类型
op.updateOne = function(url,formid,callback){
	var dd = $("#"+formid).serializeJSON();
	console.log(dd);
	$.ajax({
		url: url,
		type: 'PUT',
		contentType:'application/json',
		data: dd,
		success: function (data) {
			if(callback){
				callback(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* Act on the event */
			console.log(textStatus+errorThrown);
				//alert("error");
			}
		});
};
//获取一个
op.getOneJson = function (url,callback){
	$.ajax({
		url:url,
		type:'get',
		success:function(data){
			if(callback){
				callback(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			/* Act on the event */
			console.log(textStatus+errorThrown);
				//alert("error");
			}
		});
};
/*
*通过ajax处理一些东西
*/
op.ajaxSome= function (url,method,data,callback){
	$.ajax({
		url:url,
		type:method,
		data:data,
		success:function(result){
			if(callback){
				callback(result);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			console.log(textStatus+errorThrown);
		}
	});

};