var ua,responsive = false;
if($.browser.msie && $.browser.version < 10){
	responsive = true;
}
$(document).ready(function(){
	try{
		$('.container').onepage_scroll({
		  sectionContainer: '.page',
		  responsiveFallback: responsive,
		  loop: false,
		  beforeMove: function(index){
			  $('.page').eq(index - 1).addClass('scale');
			  if($(window).width()<1024){
				  $(".bg p.logo .logo_blue.min").show();
			  }else{
				  $(".bg p.logo .logo_blue.large").show();
			  }
		  },
		  afterMove: function(index){
		  }
		});	
	}catch(e){}
	
	//二级菜单显示隐藏
	$("a.first_nav_link").hover(function() {
		$(this).find('.second_nav').fadeIn();
		}, function() {
		$(this).find('.second_nav').fadeOut();
	});
	//二级导航点击跳转
	$(".second_nav_link").click(function(e) {
        e.stopPropagation();
		e.preventDefault();
		var url = $(this).attr("url");
		var self = $(this).attr("self");
		if(self!=null){
			$("ul.onepage-pagination a").each(function(index, element) {
                if($(this).attr("href")==self){
					$(this).click();
					return;
				}
            });
			return;
		}
		window.location.href = url;	
    });

});