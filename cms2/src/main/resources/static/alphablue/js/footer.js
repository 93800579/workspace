/**
 * 微信二维码
 */
$(document).ready(function(){
	var icon = $("img.webchart");
	var hover = false;
	var t = undefined;
	
	$("a#webchart").hover(function(){
		var positonY = $(this).position().top;
		var positonX = $(this).position().left;
		if(!hover) {
			hover = true;
			icon.css({ "top": positonY-60, "left": positonX+33 });
			icon.show();
		}
	}, function(){
		if(hover) {
			hover = false;
			hideWebChart();
		}
	});
	
	icon.hover(function(){
		if(!hover) {
			hover = true;
			icon.show();
		}
	}, function(){
		if(hover) {
			hover = false;
			hideWebChart();
		}
	});
	
	function hideWebChart() {
		if(!t) {
			clearTimeout(t);
		}
		t = setTimeout(function(){
			if(!hover) {
				icon.fadeOut(200);
			}
		}, 300);
	}
	
});