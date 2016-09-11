var winH=$(window),
	downLoadBox=$('#downLoadBox'),
	downBtn=$('#downBtn'),
	boxClose=$('#box-close');
downLoadBox.attr('height',winH+'px');
downBtn.click(function(){
	downLoadBox.css('display','block');
});
boxClose.click(function(){
	downLoadBox.css('display','none');
})
// //滚轮向下滚动一下，页面向下滚动一屏。
// var i=0;//翻屏变量，初始第一屏
// var s = 0; //该变量作用是鼠标滑轮一直向下或者向上滑动时出现抖动现象
 
// $(function(){ 
//   var starttime = 0,
//     endtime = 0,
//     divs=$('.screen'),
//     divsLen=divs.length;
//   $("body").mousewheel(function(event, delta) {
//     starttime = new Date().getTime(); //记录翻屏的初始时间
//     if (delta < 0&& i>=0 && i<=divsLen-1) { 
//       if (s>=0&&(starttime == 0 || (endtime - starttime) <= -500)) { //在500ms内执行一次翻屏
//         s=1;
//         i++;
//         renderPage(i,true); //翻屏函数
//         endtime = new Date().getTime(); //记录翻屏的结束时间
//       }
//     } else if (delta > 0&& i>=1&&s==1&& (starttime == 0 || (endtime - starttime) <= -500)) {  
//       i--;
//       //console.log(i);
//       renderPage(i,true);
//       endtime = new Date().getTime();           
//     }  
 
//   });
// //记录每个要向下翻屏的div的高度
//   div_height_arr=[];
//  $.each(divs,function(i){
//  	div_height_arr.push($(this).height());
//  })
//  //当页面宽度发生变化时，记录div的高度
// $(window).resize(function(){
// div_height_arr=[];
//  $.each(divs,function(i){
//  	div_height_arr.push($(this).height());
//  }) 
 
//   });
//  //console.log(div_height_arr)
//   function renderPage(pageNumber, isScroll){ 
//     if (isScroll){
//     	var div_height=0,
//     		div_height2=0;
//     	//console.log(div_height_arr)
//     	$.each(div_height_arr,function(i){
//     		if(i<=(pageNumber-1)){
//     			div_height+=div_height_arr[i];
//     		}
//     		if(i<=2){
//     			div_height2+=div_height_arr[i];
//     		}
//     	})
//     	div_height1=div_height-80;
//         $('body, html').animate({scrollTop:div_height1}, 'slow');
//         $("#mainList li").removeClass("checked");
//         $("#mainList li").eq(pageNumber).addClass("checked");
//         if($('html').scrollTop()>=0){
// 	 		secondScreenAnimate();
// 	 	}
// 	 	if($('html').scrollTop()>=div_height2){
// 	 		sixthScreenAnimate();
// 	 	}
//       } 
//      return;
//     }
 
//   $("#mainList li").on("click", function(){ //点击小导航也执行翻屏
//     var index = $(this).index();
//     renderPage(index, true);
//     $(".left_fixed ul li").removeClass("active");
//     $(this).addClass("active");
//     return false;
//   });
// })
// //第二屏动画
// function secondScreenAnimate(){
// 	setTimeout(function(){
// 		$(".secondScreens .secondLeft").addClass('animated fadeInUp').css("visibility","visible");
// 	},800);
// 	setTimeout(function(){
// 		$(".secoImg1").addClass('animated fadeInUp').css("visibility","visible");
// 	},1000);
// 	setTimeout(function(){
// 		$(".secoImg2").addClass('animated fadeInUp').css("visibility","visible");
// 	},1500);
// 	setTimeout(function(){
// 		$(".secoImg3").addClass('animated fadeInUp').css("visibility","visible");
// 	},2000);
// 	setTimeout(function(){
// 		$(".secoImg4").addClass('animated fadeInUp').css("visibility","visible");
// 	},2500);
// 	setTimeout(function(){
// 		$(".secoImg5").addClass('animated fadeInLeft').css("visibility","visible");
// 	},3000);
// 	setTimeout(function(){
// 		$(".secoImg6").addClass('animated fadeInRight').css("visibility","visible");
// 	},3500);
// }
// /*第六屏动画*/
// function sixthScreenAnimate(){
// 	setTimeout(function(){
// 		$(".safeInfo").addClass('animated fadeInUp').css("display","block");
// 	},1000);
// }
