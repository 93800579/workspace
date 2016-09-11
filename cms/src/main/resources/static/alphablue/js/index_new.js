$(document).ready(function(){
	
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;  
	if(scrollTop>=700){
		$(".bg .dbf").addClass("dbf_white");
		if($(window).width()<1024){
			$(".bg p.logo .large").hide();
			$(".bg p.logo .logo_white.min").hide();
			$(".bg p.logo .logo_blue.min").show();
		}else{
			$(".bg p.logo .min").hide();
			$(".bg p.logo .logo_white.large").hide();
			$(".bg p.logo .logo_blue.large").show();
		}
	}
	if(scrollTop<700){
		$(".bg .dbf").removeClass("dbf_white");
		if($(window).width()<1024){
			$(".bg p.logo .large").hide();
			$(".bg p.logo .logo_white.min").show();
			$(".bg p.logo .logo_blue.min").hide();
		}else{
			$(".bg p.logo .min").hide();
			$(".bg p.logo .logo_white.large").show();
			$(".bg p.logo .logo_blue.large").hide();
		}
	}
	
	$(document).bind("mousemove", function(e){
		e.preventDefault();//阻止浏览器默认行为
	});
	//监听导航栏是否在第一屏
	$(window).scroll(function(){  
        //scrollTop是浏览器滚动条的top位置，  
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;  
		if(scrollTop>=700){
			$(".bg .dbf").addClass("dbf_white");
			if($(window).width()<1024){
				$(".bg p.logo .large").hide();
				$(".bg p.logo .logo_white.min").hide();
				$(".bg p.logo .logo_blue.min").show();
			}else{
				$(".bg p.logo .min").hide();
				$(".bg p.logo .logo_white.large").hide();
				$(".bg p.logo .logo_blue.large").show();
			}
		}
		if(scrollTop<700){
			$(".bg .dbf").removeClass("dbf_white");
			if($(window).width()<1024){
				$(".bg p.logo .large").hide();
				$(".bg p.logo .logo_white.min").show();
				$(".bg p.logo .logo_blue.min").hide();
			}else{
				$(".bg p.logo .min").hide();
				$(".bg p.logo .logo_white.large").show();
				$(".bg p.logo .logo_blue.large").hide();
			}
		}
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；  
        /*if(scrollTop+clientHeight==htmlHeight){  
             addLi();  
        } */ 
    });
	
	//首屏轮播
	$('.ck-slide').ckSlide({
		autoPlay: true
	});
	//收益合计
	$(".indexBtn_sum").click(function(e) {
		$("p.result span").text(0);
        var num = $("#sumInput").val();
		if(num!=""){
			var _val = Number(num);
			if(!isNaN(_val)&&_val>0){
				var result = _val*0.059;
				$("p.result span").text(result.toFixed(2));
			}
		}
    });
});

// 路径配置
require.config({
	paths: {
		echarts: "resources/js/echarts"
	}
});
// 使用

require(
	[
		'echarts',
		'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	],
	function (ec) {
		// 基于准备好的dom，初始化echarts图表
		return;
                var myChart = ec.init(document.getElementById('chartDom')); 
		
		var option = {
			calculable : true,
			series : [
				{
					name:'访问来源',
					type:'pie',
					radius : ['60%', '90%'],
					itemStyle : {
						normal : {
							label : {
								show : false
							},
							labelLine : {
								show : false
							},
							color: function (value){
								if(value.dataIndex==0){
									 return "#00cfff"; 
								}
								if(value.dataIndex==1){
									 return "#0099FF"; 
								}
								if(value.dataIndex==2){
									 return "#0066CC"; 
								}
							}
						},
						emphasis : {
							label : {
								show : true,
								position : 'center',
								textStyle : {
									fontSize : '16'
								},
								formatter:function(value){
									var centerText = value.name+" "+value.value+"%";
									return centerText;
								}
								//formatter :'{b}{d}%'
							}
						}
					},
					data:[
						{value:39.64, name:'交通运输'},
						{value:22.37, name:'基础化工'},
						{value:37.99, name:'建材'}
					]
				}
			]
		};

		// 为echarts对象加载数据 
		myChart.setOption(option); 
		
		var ecConfig = require('echarts/config');
		function eConsole(param) {
			var trId = "#dataTable tr.data"+(param.dataIndex+1);
			$("#dataTable tr.data").show();
		}
		function eConsole2(param) {
			$("#dataTable tr.data").hide();
			var trId = "#dataTable tr.data"+(param.dataIndex+1);
			$(trId).show();
		}
		myChart.on(ecConfig.EVENT.MOUSEOUT, eConsole);
		myChart.on(ecConfig.EVENT.HOVER, eConsole2);
		
	}
);
//退出
function logout(){
	window.sessionStorage.clear();
//	$.cookie('registid',null,{ path: '/xire_b2c' });
	$.post("./login/loginSession.jsp",{flag:"logout"},function(){
		window.location.href="./index.html";
	} );
}

