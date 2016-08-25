/*打印投注选项*/
function add_input_ds(plays){
	var html = 	'';
	html += "<div class='danshi-panel'>";
	html += "<div class='danshi-content'><form onsubmit='countinput()' method='POST' action='?a=lotto&m=countinput&games="+gamekey+"&playid="+playlist.playid+"' name='danshiform' id='danshiform'>";
	html += "<table><tr><td rowspan='2'><textarea style='margin-left: 17px;margin-top: 6px;' rows='5' cols='100' class='' name='contents'  id='lt_write_box' placeholder='注意：每注号码间用一个 逗号[,] 或者 分号[;] 或者 空格[ ] 隔开单式投注请用快捷键:CTRL+C复制,CTRL+V粘贴进行投注。";
	if(gamekey.indexOf('11-5')>1){html+="示例： 三码 01 02 03;02 03 04 任选 01 02 03 04 05";}
	html += "'></textarea></td><td>";
	html += "<input style='width:100px;margin-left:10px;' class='btn h26' onclick='uploadfile()' type='button' value='导入文本文件' /></td><tr><td>";
	html += "<input style='width:100px;margin-left:10px;' class='btn h26' onclick='Clear_Write()' type='button' value='清空文本框' />";
	html += "</td></tr></table>";
	html += "</form><textarea id='lt_write_box_ok' name='lt_write_box_ok' style='display:none'></textarea></div>";
	html += "</div>";
	G('lt_selector').innerHTML=html;
	var $test = $('#lt_write_box');
	//使用
	bindChangeHandler($test[0],function(){
		getDsNum();
	});
}
function uploadfile(){
	buyDivId = layer.open({
		type: 2,
		title: '导入单式注单',
		offset: '100px',
		skin: 'layui-layer-rim', //加上边框
		area: ['460px', '200px'], //宽高
		content: '?a=lotto&m=countinput&games='+gamekey+'&playid='+playlist.playid
	});
	
}
function countinput(){
	winPop({title:'计算注数',form:'danshiform',top:'300',ishow:'true',drag:'true',width:'400',height:'120',iclose:'true'})
} 
function add_input_key(plays){
	var playid=plays.playid;var thisids="";
	var show_keys=plays.show_key; 
    var keylist;var keystr="";var htmlstr="";var n_css;var keytitle;var sele_list= new Array;
	var keys=show_keys.split("~");
	var bodyHTML="";var keylengs=0;var keycss="select_list_no";
	var titles=plays.title.split("|");
	for (i=0;i<keys.length;i++){
		if(titles[i]){select_title_css="select_title_span";}else{select_title_css="select_title_css";}
		//bodyHTML+="<div id='div_key_"+i+"' class='select_div_line'><span id='title_"+i+"' class='"+select_title_css+"'>"+titles[i]+"</span>";
		if(titles[i] == undefined){
			titles[i] = '&nbsp;';
		}
		//bodyHTML +='<li id="div_key_'+i+'" style="clear:left"><div class="mode-ball"><p class="position">'+titles[i]+'</p><p class="current-mode select" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>        <span class="init" data-val="0" data-item="'+i+'">当前遗漏</span><span class="second" data-val="1" data-item="'+i+'">当前冷热</span><input value=0 id="lr_'+i+'" type="hidden" /></p></div><ul class="ball-columus">';
		keylist=keys[i].split("|");
        keylengs=keylist.length;;
		if(playid=='pkhz_hzq2' || playid=='pkhz_hzh2'){keycss="40px";}
		else if(keylengs-4>=0){keycss="75px";} 
		else if(keylengs-3==0){keycss="157px";}
		else if(keylengs-2==0){keycss="240px";}
		else if(keylengs-1==0){keycss="157px";}
		keycss = '';
		bodyHTML += '<div class="theplay bot_bor play-sec1">';
		bodyHTML += '<div class="rightbox">';
		bodyHTML += '<div class="ball-panel">';
		bodyHTML += '<ul class="ball-rows" id="lt_selector2">';
		bodyHTML += '<li>';
		bodyHTML += '<div class="mode-ball"><p class="position">'+titles[i]+'</p></div>';
		bodyHTML += '<ul class="ball-columus ballcircle">';
		for (j=0;j<keylengs;j++){
			if((playid=="QWX2_sxp") || (playid=="QWX2_jep")){thisids=""+keylist[j].substr(0,1);}else{thisids=keylist[j];}
			bodyHTML+="<li id='select_"+i+"_"+j+"' class='' style='width:"+keycss+";text-align:center;' onclick=\"SelectNum('"+i+"','"+j+"')\"><div><span></span><strong>"+thisids+"</strong></div></li>";
			//if(j-10 == 0){bodyHTML += "<br>";}
		}
		bodyHTML += '</ul>';
		bodyHTML += '</div>';
		bodyHTML += '</div>';
		bodyHTML += '</div>';
	} 
	G('lt_selector').innerHTML=bodyHTML;
	return i;
}
function add_input_other(plays){
	var playid=plays.playid;
	var keys=plays.show_other.split("|");
	if(plays.title){var select_title_css="select_title_span";}else{var select_title_css="select_title_css";}
	/*var bodyHTML='<li id="div_other_0"><div class="mode-ball"><p class="position" id="title_0">'+(plays.lryl==1 && plays.title==''?'号码':plays.title)+'</p><p class="current-mode select" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>        <span class="init" data-val="0" data-item="0">当前遗漏</span><span class="second" data-val="1" data-item="0">当前冷热</span><input value=0 id="lr_0" type="hidden" /></p></div><ul class="ball-columus" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="height:40px;"')+'>'
	var mins=keys[0]*1;var maxs=keys[keys.length-1]*1;
	var dds = 0;
	for (i=mins;i<=maxs;i++){
		if(dds%15==0 && dds>0 && playid!='k3hz_zxhz'){bodyHTML+='</ul></li><li id="div_other_0" style="clear:left"><div class="mode-ball"><p class="position" id="title_0">&nbsp;</p><p class="current-mode">&nbsp;</p></div><ul class="ball-columus" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="height:40px;"')+'>';}
		bodyHTML+='<li id="select_0_'+i+'"  class="" onclick="SelectNum(\'0\',\''+i+'\')"><div>'+i+'</div><i class="lost" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>0</i></li>'
		dds ++;
	}
	bodyHTML+="</ul></li>";*/
	
	

	bodyHTML = '<div class="theplay bot_bor play-sec1">';
	bodyHTML += '<div class="rightbox">';
	bodyHTML += '<div class="ball-panel">';
	bodyHTML += '<ul class="ball-rows " id="lt_selector2">';
	bodyHTML += '<li>';
	bodyHTML += '<div class="mode-ball"><p class="position">'+(plays.lryl==1 && plays.title==''?'号码':plays.title)+'</p><p class="current-mode select" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>        <span class="init" data-val="0" data-item="0">当前遗漏</span><span class="second" data-val="1" data-item="0">当前冷热</span><input value=0 id="lr_0" type="hidden" /></p></div>';
	bodyHTML += '<ul class="ball-circle ball-circle-40">';
	
	var mins=keys[0]*1;var maxs=keys[keys.length-1]*1;
	var dds = 0;
	for (i=mins;i<=maxs;i++){
		if(dds%15==0 && dds>0 && playid!='k3hz_zxhz'){bodyHTML+='</ul></li><li id="div_other_0" style="clear:left"><div class="mode-ball"><p class="position" id="title_0">&nbsp;</p><p class="current-mode">&nbsp;</p></div><ul class="ball-circle ball-circle-40" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="height:40px;"')+'>';}
		
		bodyHTML+='<li id="select_0_'+i+'"  class="" onclick="SelectNum(\'0\',\''+i+'\')"><div>'+i+'</div><i class="lost" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>0</i></li>'
		dds ++;
	}
	bodyHTML += '</ul>';
	bodyHTML += '</div>';
	bodyHTML += '</div>';
	bodyHTML += '</div>';

	G('lt_selector').innerHTML=bodyHTML;
}
function add_input_shownum(plays,nums){
	var playid=plays.playid;
	var shownum=parseInt(plays.shownum,10); 
	var minnum=parseInt(plays.minnum,10);  
	var maxnum=parseInt(plays.maxnum,10); 
	var max_select=plays.max_select; 
	var min_select=plays.min_select;  
    var thisids="";var bodyHTML="";var select_title_css="";
	var titles=plays.title.split("|");
	if(gamekey.indexOf('KL8')>1){
		var len=playid.substr(playid.length-1,1);
		    var i=0


			bodyHTML += '<div class="theplay bot_bor play-sec1">';
			bodyHTML += '<div class="rightbox">';
			bodyHTML += '<div class="ball-panel">';
			bodyHTML += '<ul class="ball-rows">';
			bodyHTML += '<li>';
			bodyHTML += '<div class="mode-ball"><p class="position">上</p></div>';
			bodyHTML += '<ul class="ball-circle ballcircle">';
			for (j=minnum;j<=40;j++){
				thisids=j;
				if(maxnum-10>0){if(j-10<0){thisids="0"+j;}}
				bodyHTML+='<li class="" id="select_'+i+"_"+j+'" onclick="SelectNum(\''+i+'\',\''+j+'\')"><div>'+thisids+'</div></li>';
				if(j == 20){
					bodyHTML+='</ul>';
					bodyHTML+='</li>';
					bodyHTML+='<li>';
					bodyHTML+='<div class="mode-ball"><p class="position">&nbsp;</p></div>';
					bodyHTML+='<ul class="ball-circle">';
				}
			}
			bodyHTML+="</ul>";
			bodyHTML+="</li>";
			bodyHTML+="</ul>";
			bodyHTML+="</div>";
			bodyHTML+="</div>";
			bodyHTML+="</div>";
			
			
			bodyHTML += '<div class="theplay bot_bor play-sec1">';
			bodyHTML += '<div class="rightbox">';
			bodyHTML += '<div class="ball-panel">';
			bodyHTML += '<ul class="ball-rows">';
			bodyHTML += '<li>';
			bodyHTML += '<div class="mode-ball"><p class="position">上</p></div>';
			bodyHTML += '<ul class="ball-circle">';
			var i=0
			for (j=41;j<=maxnum;j++){
				thisids=j;
				if(maxnum-10>0){if(j-10<0){thisids="0"+j;}}
				bodyHTML+='<li class="" id="select_'+i+"_"+j+'" onclick="SelectNum(\''+i+'\',\''+j+'\')"><div>'+thisids+'</div></li>';
				if(j == 60){
					bodyHTML+='</ul>';
					bodyHTML+='</li>';
					bodyHTML+='<li>';
					bodyHTML+='<div class="mode-ball"><p class="position">&nbsp;</p></div>';
					bodyHTML+='<ul class="ball-circle">';
				}
			}
			bodyHTML+="</ul>";
			bodyHTML+="</li>";
			bodyHTML+="</ul>";
			bodyHTML+="</div>";
			bodyHTML+="</div>";
			bodyHTML+="</div>";
			
			bodyHTML+='<div class="theplay bot_bor play-sec2">';
			bodyHTML+='<div class="rightbox">';
			bodyHTML+='<div class="ball-panel">';
			bodyHTML+='<ul class="ball-rows">';
			bodyHTML+='<li>';
			bodyHTML+='<div class="mode-ball"><p class="position">&nbsp;</p></div>';
			bodyHTML+='<ul class="ball-columus" style="margin:0 0 0 34px;">';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'up\',\'all\',8)"><div><span></span><strong>上</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'down\',\'all\',8)"><div><span></span><strong>下</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'all\',\'sin\',8)"><div><span></span><strong>单</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'all\',\'dou\',8)"><div><span></span><strong>双</strong></div></li>';
			bodyHTML+=' <li class="wid-1" onclick="Select_QwAuto(\'up\',\'sin\',8)"><div><span></span><strong>上单</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'down\',\'sin\',8)"><div><span></span><strong>下单</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'up\',\'dou\',8)"><div><span></span><strong>上双</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'down\',\'dou\',8)"><div><span></span><strong>下双</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="Select_QwAuto(\'all\',\'all\',8)"><div><span></span><strong>混合</strong></div></li>';
			bodyHTML+='<li class="wid-1" onclick="selectMore(\'0\',\'dell\',\'1\',\'1\',\'80\')"><div><span></span><strong>清除</strong></div></li>';
			bodyHTML+='</ul>';
			bodyHTML+=' </li>';
			bodyHTML+='</ul>';
			bodyHTML+='</div>';
			
			
			bodyHTML+='</div>';
			bodyHTML+='</div>';
 
	}else{ 
		var listnum=parseInt(nums,10);var semorenum=0;
		var beginnum=0;var endnum=shownum;
		if(listnum-1>=0){beginnum=listnum;endnum=shownum+listnum;}else{beginnum=0;endnum=shownum;} 
		for (i=beginnum;i<endnum;i++ )
		{
			
			
			bodyHTML += '<div class="theplay bot_bor play-sec1">';
            bodyHTML += '<div class="rightbox">';
            bodyHTML += '<div class="ball-panel">';
            bodyHTML += '<ul class="ball-rows" id="lt_selector2">';
            bodyHTML += '<li>';
            bodyHTML += '<div class="mode-ball"><p class="position">'+(plays.lryl==1 && titles[i]==''?'号码':titles[i])+'</p><p class="current-mode select" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>        <span class="init" data-val="0" data-item="'+i+'">当前遗漏</span><span class="second" data-val="1" data-item="'+i+'">当前冷热</span><input value=0 id="lr_'+i+'" type="hidden" /></p></div>';
            bodyHTML += '<ul class="ball-circle ballcircle ball-circle-'+(gamekey=='GDKLSF'?'50':'40')+'">';
			
			
			if(titles[i]){select_title_css="select_title_span";}else{select_title_css="select_title_css";}
			//bodyHTML += '<li  id="div_show_'+i+'" style="clear:left"><div class="mode-ball"><p class="position" id="title_'+i+'">'+(plays.lryl==1 && titles[i]==''?'号码':titles[i])+'</p><p class="current-mode select" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>        <span class="init" data-val="0" data-item="'+i+'">当前遗漏</span><span class="second" data-val="1" data-item="'+i+'">当前冷热</span><input value=0 id="lr_'+i+'" type="hidden" /></p></div><ul class="ball-columus">';
			for (j=minnum;j<=maxnum;j++){
				thisids=j;
				if(maxnum-10>0){if(j-10<0){thisids="0"+j;}}
				bodyHTML+='<li class="" id="select_'+i+"_"+j+'" onclick="SelectNum(\''+i+'\',\''+j+'\')"><div>'+thisids+'</div><i class="lost" '+(plays.lryl==1 && gamekey.indexOf('MMC')<0?'':' style="display:none"')+'>0</i></li>';
				if(j == 10 && maxnum>11){bodyHTML+='<br>';}
			} 
            bodyHTML += '</ul>';
			if(playid=="RXDT_8z5"){semore="no";semorenum=beginnum+1;}
			if(playid=="RXDT_7z5"){semore="no";semorenum=beginnum+1;}
			if(playid=="RXDT_6z5"){semore="no";semorenum=beginnum+1;}
			if(playid=="RXDT_5z5"){semore="no";semorenum=beginnum+1;}
			if(playid=="RXDT_4z4"){semore="no";semorenum=beginnum+1;}
			if(playid=="3M_zxdt" || playid=="RXDT_3z3"){semore="no";semorenum=beginnum+1;}
			if(playid=="2M_zxdt" || playid=="RXDT_2z2"){semore="no";semorenum=beginnum+1;}
			if(playid=="k3sbth_dt" || playid=="k3ebth_dt"){semore="no";semorenum=beginnum+1;}

			if(i-semorenum>=0){
				bodyHTML+='<ul class="ball-control">';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'0\')">全</a></li>';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'1\')">大</a></li>';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'2\')">小</a></li>';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'3\')">奇</a></li>';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'4\')">偶</a></li>';
				bodyHTML+='	<li><a href="javascript:void(0);" id="do_'+i+'" onclick="selectMore(\''+i+'\',\'del\')">清</a></li>';
				bodyHTML+='</ul>';
			} 
			
            bodyHTML += '</li>';
            bodyHTML += '</ul>';
            bodyHTML += '</div>';
            bodyHTML += '</div>';
            bodyHTML += '</div>';
		}//alert(bodyHTML);return false;
	}	
	G('lt_selector').innerHTML+=bodyHTML;
	
}
function add_input_select(plays,nums){
	var skeyarr = plays.select_key.split('|');
	var skeyarr2 = plays.select_def.split('|');
	var bodyHTML ='<ul id="showselect">';
	for(var i=0; i<skeyarr.length; i++){
		//alert(plays.select_def.indexOf(skeyarr[i]));
		if(plays.select_def.indexOf(skeyarr[i])>=0){
			var isxz = 'checked="checked"';
		}else{
			var isxz = '';
		}
		bodyHTML+='	<li onclick="setbetfangan(\''+i+'\')"><input value="'+i+'" type="checkbox" id="selectid_'+i+'" '+isxz+'><label for="selectid_'+i+'">'+skeyarr[i]+'</label></li>';
	}
	bodyHTML+='	<li><span>温馨提示：您选择了<font id="weizhi"></font>个位置，系统将自动生成<font id="fangan"></font>个方案</span></li>';
	bodyHTML+='</ul>';
	$("#showselect").remove();
	$("#helptext").append(bodyHTML);
	jsfangan(skeyarr2.length);
	//niceScrollFun();
}
function jsfangan(n){
	if(newItenKey == 'RX2'){
		var arr = new Array(0,0,1,3,6,10);
	}else if(newItenKey == 'RX3'){
		var arr = new Array(0,0,0,1,4,10);
	}else if(newItenKey == 'RX4'){
		var arr = new Array(0,0,0,0,1,5);
	}
	var zs = betzhushu*arr[n];
	if(isNaN(zs)){
		zs = 0;
	}
	$("#lt_sel_nums").html(zs)
	fanganNum = arr[n];
	$("#weizhi").html(n);
	$("#fangan").html(arr[n]);
	Count_Money();
}
function setbetfangan(i){
	var n = 0;
	$("#showselect input").each(function(){
		if($(this).attr('checked') == 'checked'){
			n ++;
		}
	});
	jsfangan(n);
}
function SelectNum(rows,lines){
	var shownum=parseInt(playlist.shownum,10); 
	var minnum=parseInt(playlist.minnum,10);  
	var maxnum=parseInt(playlist.maxnum,10);  
	var max_select=parseInt(playlist.max_select,10);  
	var min_select=parseInt(playlist.min_select,10);
	var playid=playlist.playid;
	var Obj;var Objs;var firstint;var is_cur=0;var lastcss=""; 
	
	if(playlist.show_other.indexOf("|")>0){
		var arrs=playlist.show_other.split("|");
		minnum=arrs[0];
		maxnum=arrs[arrs.length-1];
	}
	if(playlist.show_key.indexOf("|")>0){
		var arrs=playlist.show_key.split("|");
		minnum=0;
		maxnum=arrs.length-1;
	}
	if(gamekey.indexOf('KL8')>1){
		if(playid.indexOf("XX_rx")>0 && playid!="RXX_rx1"){max_select=8;}
	}
	var is_yes=0;var dantuo_s="";var tuo_num=0;var dan_num=0;
	if(playid=="RXDT_8z5"){if(rows=="0"){max_select=7;}dantuo_s="yes";}
	if(playid=="RXDT_7z5"){if(rows=="0"){max_select=6;}dantuo_s="yes";}
	if(playid=="RXDT_6z5"){if(rows=="0"){max_select=5;}dantuo_s="yes";}
	if(playid=="RXDT_5z5"){if(rows=="0"){max_select=4;}dantuo_s="yes";}
	if(playid=="RXDT_4z4"){if(rows=="0"){max_select=3;}dantuo_s="yes";}
	if(playid=="k3sbth_dt"){if(rows=="0"){max_select=2;}dantuo_s="yes";}
	if(playid=="k3ebth_dt"){if(rows=="0"){max_select=1;}dantuo_s="yes";}
	if(playid=="k3eth_ds"){if(rows=="0"){max_select=6;}dantuo_s="yes";}
	if(playid=="3M_zxdt" || playid=="RXDT_3z3"){if(rows=="0"){max_select=2;}dantuo_s="yes";}
	if(playid=="2M_zxdt" || playid=="RXDT_2z2"){if(rows=="0"){max_select=1;}dantuo_s="yes";}
 
    if(G("select_"+rows+"_"+lines)){
		Objs=G("select_"+rows+"_"+lines);
		lastcss=Objs.className;
		if(Objs.className.indexOf("ent")>0){
			Objs.className=Objs.className.substr(0,Objs.className.length-4);
		}else{
			if(max_select-1>=0){
				for (i=minnum;i<=maxnum;i++){
					Obj=G("select_"+rows+"_"+i);
					if(Obj){
						if(Obj.className.indexOf("ent")>0){
							is_cur+=1;
							if(is_cur-max_select>=0){
								Obj.className=''; 
							}
						} 
					} 
				} 
			}
			Objs.className="current";
			if(dantuo_s=="yes"){
				var others="";
				if(rows=="0"){others="1";}
				if(rows=="1"){others="0";}
				if(G("select_"+others+"_"+lines)){
					Objs=G("select_"+others+"_"+lines);
					if(Objs.className.indexOf("ent")>0){Objs.className='';}
				}
			}
		} 
	}
    count_select_arr();
	return false;  
}
//G("lt_sel_insert").onclick=function(){addSelec t(uids,skeys,fullnames,codes,shownums,show_keys,show_others,max_selects,min_selects,minnums,maxnums)};

function Clear_Write(){  
	G('lt_write_box').value="";
	G('lt_sel_nums').innerHTML='0';
	G('lt_sel_money').innerHTML='0';
	//Write_Num()
}


function Add_QwAuto(){
	var innerHTML;
	if(G('lt_RXX_div')){
		innerHTML="<table width=220 border='0' cellpadding='2' cellspacing='2' bgcolor='#526172' align=center style='position:absolute;top:450px; left:100px;'>";
		innerHTML+="<tr align=right bgcolor='#546374' height=20><td colspan=5><font color='#FFFFFF'>趣味机选(每次选取8个号码) ";
		innerHTML+="<span onclick=\"G('lt_RXX_div').style.display='none';\">X</span></font></td></tr>";
		innerHTML+="<tr align=center bgcolor='#FFFFFF' height=20><td onclick=\"Select_QwAuto('up','all',8)\">上</td>";
		innerHTML+="<td onclick=\"Select_QwAuto('all','sin',8)\">单</td>";
		innerHTML+="<td onclick=\"Select_QwAuto('up','sin',8)\">上.单</td>";
		innerHTML+="<td onclick=\"Select_QwAuto('up','dou',8)\">上.双</td>";
		innerHTML+="<td rowspan=2 onclick=\"Select_QwAuto('all','all',8)\">混合</td></tr>";
		innerHTML+="<tr align=center bgcolor='#FFFFFF' height=20><td onclick=\"Select_QwAuto('down','all',8)\">下</td>"; 
		innerHTML+="<td onclick=\"Select_QwAuto('all','dou',8)\">双</td>";
		innerHTML+="<td onclick=\"Select_QwAuto('down','sin',8)\">下.单</td>";
		innerHTML+="<td onclick=\"Select_QwAuto('down','dou',8)\">下.双</td></tr>";
		innerHTML+="</table>";
		innerHTML+="";
		
		$('#lt_RXX_div').html(innerHTML).show();
	}
}
function Show_QwAuto(vthis){
	if(vthis.className=='select_title_span_kl8_cur'){
		G('lt_RXX_div').style.display='none';
		//vthis.className='select_title_span_kl8';
	}else{
		Add_QwAuto();
		//pop_show2('lt_RXX_div','','');
		//vthis.className='select_title_span_kl8_cur';
	} 
}
function Select_QwAuto(active,dansuang,len){//Select_QwAuto('up|down|all','sin|dou|all')
	selectMore('0','del');
	var begin_n=0;var end_n=0;var P_list= new Array();var T_num=0;//sele_list.push(j);
	if(active=="up"){begin_n=1;end_n=40;}
	if(active=="down"){begin_n=41;end_n=80;}
	if(active=="all"){begin_n=1;end_n=80;}
	while (P_list.length-len<0)
	{  
		T_num=GetRandomNumber(end_n,begin_n);var is_yes="no";
		if(dansuang=="sin"){if(T_num%2==1){is_yes="yes";}}
		if(dansuang=="dou"){if(T_num%2==0){is_yes="yes";}}
		if(dansuang=="all"){is_yes="yes";}
		if(is_yes=="yes"){
			P_list.push(T_num);
		}
		P_list=filterArray(P_list);
	}
	for (i=0;i<P_list.length;i++)
	{
		G("select_0_"+P_list[i]).className="current";
	}
	count_select_arr()
} 
function selectMore(items,skey){ 
	var shownum=parseInt(playlist.shownum,10); 
	var minnum=parseInt(playlist.minnum,10);  
	var maxnum=parseInt(playlist.maxnum,10);  
	var max_select=parseInt(playlist.max_select,10);  
	var min_select=parseInt(playlist.min_select,10);
	var playid=playlist.playid;
	for(i=minnum;i<=maxnum;i++){G("select_"+items+"_"+i).className="";} 
	var middle=(maxnum-minnum)/2+(minnum);
	var mid_begin=(middle.toFixed(0));var mid_end=(middle.toFixed(0))-1; 
	if (skey=="0"){for(i=minnum;i<=maxnum;i++){G("select_"+items+"_"+i).className="current";}}
	if (skey=="1"){for(i=mid_begin;i<=maxnum;i++){G("select_"+items+"_"+i).className="current";}}
	if (skey=="2"){for(i=minnum;i<=mid_end;i++){G("select_"+items+"_"+i).className="current";}}
	if (skey=="3"){for(i=minnum;i<=maxnum;i++){if(i%2==1){G("select_"+items+"_"+i).className="current";}}}
	if (skey=="4"){for(i=minnum;i<=maxnum;i++){if(i%2==0){G("select_"+items+"_"+i).className="current";}}}
	if (skey=="5"){var nums=GetRandomNumber(maxnum,minnum); G("select_"+items+"_"+nums).className="current";}
	if (skey=="6"){for(i=minnum;i<=maxnum;i++){if(i%2==0){G("select_"+items+"_"+i).className="current";}}}
	if (skey=="del"){for(i=minnum;i<maxnum;i++){G("select_"+items+"_"+i).className="select_list_no";}}
    var yescss=get_css(G("select_0_"+minnum).className,'check');
	var nocss=get_css(G("select_0_"+minnum).className,'nocheck');
	if(playid=="3M_zxdt" || playid=="2M_zxdt" || playid=="RXDT_2z2" || playid=="RXDT_3z3" || playid=="RXDT_4z4" || playid=="RXDT_5z5" || playid=="RXDT_5z6" || playid=="RXDT_6z5" || playid=="RXDT_7z5" || playid=="RXDT_8z5" || playid=="k3sbth_dt" || playid=="k3ebth_dt"){ 
		if(items=="0"){var thisitem="1";}else{var thisitem="0";}
		for (j=minnum;j<=maxnum;j++){if(G("select_"+items+"_"+j).className=='current'){$("#select_"+thisitem+"_"+j).attr('class','');}}
    } 
	count_select_arr();
}
function get_css(lastcss,isyes){ //get_css(lastcss,"nocheck")
	var next_css="";var check_css="";var no_check="";
	if(lastcss.indexOf("ent")>0){
		next_css=lastcss.substr(0,lastcss.length-4);
		check_css=lastcss;
		no_check=lastcss.substr(0,lastcss.length-4);
	}else{
		next_css=lastcss+"_cur";
		check_css=lastcss+"_cur";
		no_check=lastcss;
	} 
	if(isyes=="check"){return check_css;}else if(isyes=="nocheck"){return no_check;}else{return next_css;}
}
//获取随机数
function GetRandomNumber(maxnums,minnums){
	var nums=parseInt(Math.random()*(maxnums-minnums+1))+minnums;
	return nums;
}
//清除数组中某个数值 isok
function drop_array_lines(arr,num){
	var drop_arr=new Array();
	for(o=0;o<arr.length;o++){
		if(parseInt(arr[o],10)-parseInt(num,10)==0){ 
			 
		}else{
			drop_arr.push(arr[o]); 
		}
	}
	return drop_arr;
}
function C_list(n,m){//n个数字，每m个组成一组
	//11!/(11-4)! * 4!
	var up_count=1;var down_count_a=1;var down_count_b=1;var down_count=0;var re_num=0;
	for (i=1;i<=n;i++){up_count=up_count*i;}
	for (j=1;j<=n-m;j++){down_count_a=down_count_a*j;}
	for (a=1;a<=m;a++){down_count_b=down_count_b*a;}
	down_count=down_count_a*down_count_b
	re_num=up_count/down_count;
	return parseInt(re_num);
}
//自由移动
zzjs_net=function (btn,bar,title){
    this.btn=document.getElementById(btn);
    this.bar=document.getElementById(bar);
    //this.title=document.getElementById(title);
    this.step=this.bar.getElementsByTagName("DIV")[0];
    this.init();
};
zzjs_net.prototype={
    init:function (){
        var f=this,g=document,b=window,m=Math;
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var l=this.offsetLeft;
            var max=f.bar.offsetWidth-this.offsetWidth;
            g.onmousemove=function (e){
                var thisX=(e||b.event).clientX;
                var to=m.min(max,m.max(-2,l+(thisX-x)));
                f.btn.style.left=to+'px';
                f.ondrag(m.round(m.max(0,to/max)*100),to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
           };
           g.onmouseup=new Function('this.onmousemove=null');
        };
     },
     ondrag:function (pos,x){
        this.step.style.width=Math.max(0,x)+'px';
        //G('CurMode').innerHTML=pos+'%';
		JsAutoModeValue(pos);
     }
} 
function selectMode(vthis){ 
	if(vthis.value=="auto"){
		G('SelectAutoMode').style.display="";
		var AutoModelong=selplay.AutoModeNum;
		var AutoModeNum=AutoModelong.substr(0,4); 
		selplay.CurModeType="auto";
		document.cookie="CurModeType=auto";
		document.cookie="CurMode="+AutoModeNum+"";
		//G('CurMode').innerHTML=AutoModeNum; 
		//var step=G('bar').getElementsByTagName("DIV")[0];
		//step.style.width=0+'px'; 
		//G('btn').style.left=0+'px';
		resetAutoMode('');
	}else{
		var this_modes=0;
		if(G('SelectAutoMode')){G('SelectAutoMode').style.display="none";} 
		if(parseInt(vthis.value,10)-1800>=0){this_modes=vthis.value;}else{this_modes=ArrFixModes[0];}
		selplay.CurModeType="fix";
		selplay.CurMode=this_modes;
		G('CurMode').innerHTML=this_modes;
		document.cookie="CurModeType=fix";
		document.cookie="CurMode="+this_modes+"";		
	}
}
//获取返点和奖金
function JsAutoModeValue(vpos){
	var ns=parseInt(vpos,10);
	var MinBonus=parseFloat(selplay.MinBonus,10);
	var rebate=parseFloat((selplay.MaxMode-selplay.MinMode)/20,10);
	var prize=parseFloat(arrPlayPri[playlist.playid]['1800'],10);
	if(rebate-0.1>=0){
		var minMode=parseFloat(selplay.MinMode);
		var maxMode=parseFloat(selplay.MaxMode); 
		$("#maxmode").html(maxMode); 
		$("#minmode").html(minMode); 
		var thisMode=(maxMode-minMode)*ns/100+minMode;
		var curMode=thisMode.toFixed(0);
		if(parseInt(curMode,10)%2==1){thisMode=parseInt(curMode,10)+1;}else{thisMode=parseInt(curMode,10);}
		var thisRebate=rebate-((thisMode-minMode)/20);
		var thisPrize=(prize/1800)*thisMode;
		thisRebate=thisRebate.toFixed(1);
		thisPrize=thisPrize.toFixed(2);
		if(arrPlayPri[playlist.playid]['1800'].indexOf('|') > 0){
			G('CurMode').innerHTML=thisMode+"/"+thisRebate;
		}else{
			G('CurMode').innerHTML=thisMode+"/"+thisRebate+"/"+thisPrize;
		}
		selplay.CurMode=thisMode;
		setjjmode(thisMode);
	}
}
//打开初使化
function resetAutoMode(item){
	var minMode=parseFloat(selplay.MinMode);
	var thisMode=minMode;
	var MinBonus=parseFloat(selplay.MinBonus);
	if(selplay.CurMode){thisMode=parseInt(selplay.CurMode,10);}
	if(G('SelectAutoMode')){
		var ones=MinBonus*20;
		var rebate=parseFloat((selplay.MaxMode-selplay.MinMode)/20,10);
		var prize=parseFloat(arrPlayPri[playlist.playid]['1800'],10);
		if(rebate-0.1>=0){ 
			var maxMode=parseFloat(selplay.MaxMode);
			var linelong=maxMode-minMode;
			$("#maxmode").html(maxMode);
			$("#minmode").html(minMode); 
			if(item=="lost"){thisMode=thisMode-ones;}
			if(minMode-thisMode>0){thisMode=minMode;}
			 
			if(item=="add"){thisMode=thisMode+ones;}
			if(thisMode-maxMode<=0){
				thisMode=thisMode.toFixed(0); 
				var thisRebate=rebate-((thisMode-minMode)/20);
				var thisPrize=(prize/1800)*thisMode;
				thisRebate=thisRebate.toFixed(1);
				thisPrize=thisPrize.toFixed(2);
				if(arrPlayPri[playlist.playid]['1800'].indexOf('|') > 0){
					G('CurMode').innerHTML=thisMode+"/"+thisRebate;
				}else{
					G('CurMode').innerHTML=thisMode+"/"+thisRebate+"/"+thisPrize;
				}
				
				
				var ns=(thisMode-minMode)/linelong
				//ns=ns.toFixed(2);
				/*滚动条初使化*/
				$("#autoFandian").show();
				$('#SelectAutoMode').show();
				var btn=document.getElementById("btn");
				var bar=document.getElementById("bar");
				var step=bar.getElementsByTagName("DIV")[0]; 
				var max=bar.offsetWidth;
				var lefts=max*ns;
				btn.style.left=lefts+'px';
				step.style.width=lefts+'px';
				
				selplay.CurMode=thisMode;//alert(selplay.CurMode)
				setjjmode(thisMode);
				
			}
		}
	}
}
function hideFD(){
	var v = $("#CurMode").html();
	var varr = v.split('/');
	$("#jjmodes").val(varr[0]);
	if(varr.length == 2){
		$("#customMo4").html(varr[0]+'~'+varr[1]+'%');
	}else{
		$("#customMo4").html(varr[2]+'~'+varr[1]+'%');
	}
	
	setjjmode(varr[0]);
	$("#autoFandian").hide();
}
//投注转列号码
function reselline(selists4){
	
	var bodys="";var l_a="";var l_b="";
	if(isArray(selists4)){if(selists4.length-1==0){return selists4;return false;}}
	for (i=0;i<selists4.length;i++)
	{   
		var l_b="";
		bodys+=l_a;
		var lists=selists4[i];
		if(isArray(lists)){
			for (j=0;j<lists.length;j++)
			{
				bodys+=l_b+""+lists[j];
				//alert($(lists[j]).children("div").text());
				if ((gamekey.indexOf("11-5")>0) || (gamekey.indexOf("KL8")>0) || (gamekey.indexOf("PK10")>0) || (gamekey.indexOf("KLSF")>0)){
					l_b=" ";
				}else{
					l_b="";
				}
			}
			var l_a=",";
		} 
	}
	return bodys;
}
//是否数组
function isArray(obj) {    
    return Object.prototype.toString.call(obj) === '[object Array]';     
}
//删除投注项
function deleteDiv(id){
	 var nums=parseInt(G("num_"+id).innerHTML,10); 
	 var moneys=parseFloat(G("money_"+id).innerHTML,10); 
     var idsplit = id.split('_');
	 if(parseInt(G('lt_cf_nums').innerHTML,10)-nums>=0){var n_nums=parseInt(G('lt_cf_nums').innerHTML,10)-nums;}else{var n_nums="0";}
	 if(parseFloat(G('lt_cf_money').innerHTML,10)-moneys>=0){var n_moneys=parseFloat(G('lt_cf_money').innerHTML,10)-moneys;}else{var n_moneys="0";}
	 if(parseInt(G('lt_cf_count').innerHTML,10)-1>=0){var n_count=parseInt(G('lt_cf_count').innerHTML,10)-1;}else{var n_count="0";
	 }

	 G('lt_cf_count').innerHTML=n_count;
	 G('lt_cf_nums').innerHTML=n_nums;
	 n_moneys=n_moneys.toFixed(2);
	 G('lt_cf_money').innerHTML=n_moneys; 

     var my = document.getElementById("div_"+id);
     if (my != null)
        my.parentNode.removeChild(my);

	 if(G('lt_cf_count').innerHTML=="0"){$("#nonetz").show();clearTask();}
	 delete(betinfoArr[idsplit[2]]);
	 top.iFrameHeight('mainframe');
 }
 //追号===================================================
function select_zh(itemnum){
	/*
	if(G("it_select_max")){G("it_select_max").value="";}
	if(G("input_times")){var input_times=G("input_times").value;}
	if(G("input_period")){var input_period=G("input_period").value;}
    */
	clearTaskSel();
	seltask.nums=0;
	selectSetItem(G('lt_trace_qissueno'),'0');
	var innerHTMLs='<label>追号计划：</label>'; 
	if(itemnum=="11"){ 
		if(G("this_zh_num")){G("this_zh_num").value="11";}
		innerHTMLs+='&nbsp;<label>起始倍数</label> <input id="input_times"  class="" size="4" onkeyup="is_number(this);beginTime(\'input_times\');" onafterpaste="is_number(this)" value="">';
		innerHTMLs+='&nbsp;&nbsp;<label>最低收益</label> <input id="input_prize" class="" size="4" value="50%">';
	} 
	if(itemnum=="12"){ 
		if(G("this_zh_num")){G("this_zh_num").value="12";}
		innerHTMLs+='&nbsp;<label>起始倍数</label> <input id="beginTime" class="" size="4" onkeyup="is_number(this);beginTimes(\'beginTime\');" onafterpaste="is_number(this)" value="">';  
	} 
	if(itemnum=="13"){
		if(G("this_zh_num")){G("this_zh_num").value="13";}
		innerHTMLs+='&nbsp;<label>隔</label> <input id="input_xg" size="4" class="" onkeyup="is_number(this);beginTimes(\'input_xg\')" onafterpaste="is_number(this)" value="1"> <label>期&nbsp;&nbsp;倍 X </label> '; 
		innerHTMLs+='<input id="input_bs" size="4" class="" onkeyup="is_number(this);beginTimes(\'input_bs\');" onafterpaste="is_number(this)" value="">';
		
	}
	innerHTMLs+='&nbsp;&nbsp;<label>追号期数</label> <input id="input_period" class="" size="4" onkeyup="is_number(this);beginTimes(\'input_period\')" onafterpaste="is_number(this)" value="">';
	if(G('lt_trace_labelhtml')){
		G('lt_trace_labelhtml').innerHTML=innerHTMLs;
	}
	$("#trace_panelh4 .current").removeClass("current");
	$("#button"+itemnum).addClass("current")
	$("#zhtext").html(' 我要追号 ')
	$("#show_status").html('')
}
function clearTaskSel(){
	seltask.istask='no';
	seltask.perstop='no';
	seltask.moneys='0';
	seltask.list=''; 
	var sel_rows=document.getElementsByName("sel_rows[]");
	for (i=0;i<sel_rows.length;i++ )
	{
		sel_rows[i].checked = false;
		G("input_"+sel_rows[i].value).value="";
		$("#amo_"+sel_rows[i].value).html("0.00");
		G("input_"+sel_rows[i].value).setAttribute('disabled',true);
	}
	G('show_status').innerHTML="";
	G('lt_trace_count').innerHTML="0"; 
	G('lt_trace_hmoney').innerHTML="0.00"; 
	var m = 0;
	$("#lt_cf_content .li_5").each(function(index, element) {
        m += $(this).html()*1;
    });
	G('lt_cf_money').innerHTML=m; 
	//$("#lt_trace_labelhtml input").val('');
} 
function beginTimes(vthis){
	if(parseFloat($('#lt_cf_money').html()) == 0){
		$("#lt_trace_labelhtml input").val('');
		parent.layer.msg("<span style='font-size:16px;'>请先添加投注号码！</sqan>");
		return false;
	}
	var maxPn=0;var thisSelect="";var xg=1;var bs=1;var thisbd=1;var is_sel=0;var beginTime=1;
	clearTaskSel();
	maxPn=parseInt(seltask.nums,10);
    var maxtimes=GetMaxTimes(); 
	var e=document.getElementsByName("sel_rows[]"); 
	var vvalue = $("#"+vthis).val();
	if(vthis=="input_xg"){
		xg=parseInt(seltask.nums,10);
	}
	if(G('beginTime')){
		//if(G('beginTime').value==""){G('beginTime').value="1";beginTime=parseInt(G('beginTime').value,10)}
		if(parseInt($("#beginTime").val(),10)-1>=0){beginTime=parseInt($("#beginTime").val(),10);}
	}
	if(G('input_xg')){
		if(G('input_xg').value==""){G('input_xg').value="1";}
		xg=parseInt(G('input_xg').value,10);
	}
	if(G('input_bs')){
		if(parseInt($("#input_bs").val(),10)-1>=0){bs=parseInt($("#input_bs").val(),10);}
		//bs=parseInt(G('input_bs').value,10);
	}
	if(vthis=="input_bs"){
		if(parseInt($("#input_bs").val(),10)-1>=0){bs=parseInt($("#input_bs").val(),10);}else{bs=0;}		
	}
	if(vthis=="beginTime"){
		if(parseInt($("#beginTime").val(),10)-1>=0){beginTime=parseInt($("#beginTime").val(),10);}else{beginTime=0;}		
	}
	if(vthis=="input_period"){
		if(parseInt(vvalue,10)-1>=0){
			maxPn=parseInt(vvalue,10);
			seltask.nums=maxPn;
		}
	}
	if(vthis=="lt_trace_qissueno"){
		thisSelect = vvalue;
		if(thisSelect=="all"){
			maxPn=e.length;
			seltask.nums=maxPn;
		}else{
			maxPn=parseInt(thisSelect,10);
			seltask.nums=maxPn;
		}
	}
	xg=xg-1;
	if($("#button12").hasClass('current')){
		thisbd=beginTime;
	}else{
		thisbd=0;
	}
	for (i=0;i<e.length;i++){
		if(maxPn-1<0){break;}
		if(maxPn-is_sel>0){
			e[i].checked = true;is_sel+=1;
			if(G('input_'+e[i].value)){
				if(thisbd == 0){
					thisbd = 1;
				}else{
				if(bs-1>0){thisbd=thisbd*bs;}
				}
				if(parseInt(maxtimes,10)-1>0){
					if(thisbd-parseInt(maxtimes,10)>0){
						thisbd=parseInt(maxtimes,10); 
					}
				}
				G('input_'+e[i].value).value=thisbd;
				G("input_"+e[i].value).removeAttribute('disabled');
			}
		}else{
			break;
		}
		i=i+xg;
	} 
	countTask();
}
function checkboxTime(vthis){ 
	if(vthis.checked==true){
		if(parseFloat($('#lt_cf_money').html()) == 0){
			$(vthis).attr('checked',false);
			parent.layer.msg("<span style='font-size:16px;'>请先添加投注号码！</sqan>");
			return false;
		}
		G("input_"+vthis.value).removeAttribute('disabled');
		if(G('input_'+vthis.value).value==""){G('input_'+vthis.value).value="1";}
	}else{
		G('input_'+vthis.value).value="";
		G('amo_'+vthis.value).value="0.00";
		G("input_"+vthis.value).setAttribute('disabled',true);
	}
	countTask();
}
function countTask(){
	G("lt_trace_hmoney").innerHTML = "";
	var maxtimes=GetMaxTimes();
	var selArr=readSelToArr();var arrs=new Array();
	var onemoney=0;var money=0;var times=0;var inmoney=0;var allmoney=0;var n=0;
	var tasklists="";var taskperiods="";var lines="";
	for (i=0;i<selArr.length;i++)
	{
		arrs=selArr[i];
		times=parseInt(arrs[9],10);
		money=parseFloat(arrs[6],10)/times;
		onemoney+=money;
		money=money.toFixed(2);		
	}
	var sel_rows=document.getElementsByName("sel_rows[]");
	for (i=0;i<sel_rows.length;i++ )
	{
		if(sel_rows[i].checked == true){
			if(G('input_'+sel_rows[i].value).value==""){G('input_'+sel_rows[i].value).value="1";}
			times=parseInt(G('input_'+sel_rows[i].value).value,10);
			if(parseInt(times,10)-parseInt(maxtimes,10)>0){times=maxtimes;G('input_'+sel_rows[i].value).value=times;}

			if((selplay.modes=="jiao") || (selplay.modes=="角")){
				modes="角"; 
			} 
			if((selplay.modes=="fen") || (selplay.modes=="分")){
				modes="分";
			}
			inmoney=times*onemoney;
            allmoney=allmoney+inmoney;
			inmoney=inmoney.toFixed(2); 
			G("amo_"+sel_rows[i].value).innerHTML = "";
			$("#amo_"+sel_rows[i].value).html(inmoney);
			taskperiods=$("#qih_"+sel_rows[i].value).html();
			tasktime=$("#time_"+sel_rows[i].value).html();
			tasklists+=lines+taskperiods+"^"+times+"^"+inmoney+"^"+tasktime;
			lines="#";
			n+=1;
		}		
	}
	if(G('lt_trace_stop').checked==true){
		var trace_stop="1";
	}else{
		var trace_stop="0";
	}
	if(allmoney-0.001>0){
		allmoney=allmoney.toFixed(2);
		$("#lt_trace_hmoney").html(allmoney);
		$("#lt_cf_money").html(allmoney);
		G('lt_trace_count').innerHTML=n;
		seltask={istask:'yes',perstop:trace_stop,nums:n,moneys:allmoney,list:tasklists};
		G('show_status').innerHTML="追号已生成"; 
	}else{
		G('show_status').innerHTML=""; 
		G('lt_trace_count').innerHTML="0"; 
		G('lt_trace_hmoney').innerHTML="0.00"; 
	}
}
function IsTaskStop(vthis){
	if(vthis.checked==true){seltask.perstop="1";}else{seltask.perstop="0";}
}
//投注内容吧
function readSelToArr(){
	var divid="";var dividlen=0;var spanid="";var sphtml="";var splist=new Array();var arrs=new Array();var arri=0;
	$("#lt_cf_content ul").each(function(i){
		divid=$(this).attr('id');
		dividlen=divid.length;
		spanid=divid.substr(3,dividlen-3);
		sphtml=$("#body"+spanid).html(); 
		splist[arri]=new Array();
		arrs=[];
		arrs=sphtml.split("^");
		if(arrPlayPri[arrs[3]]['1800'].indexOf('|') > 0){
			arrs[7] = selplay.CurMode;
		}
		splist[arri]=arrs;
		arri++;
	})

	return splist;
}
function Re_Buy_Info(item){
	if(item.indexOf('yes')>=0){return "投注成功";}
	if(item.indexOf('no')>=0){return "投注失败";}
}
function Re_Back_Info(item){
	var re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注信息有误，请刷新后重试！'};
	if(item[1]=="1"){re_info={colors:'#246732',bgcolors:'#CAF5D3',infos:'投注成功，祝君中奖！'};}
	if(item[1]=="2"){re_info={colors:'#246732',bgcolors:'#CAF5D3',infos:'您的余额不足，可能部分注单未成功！'};}
	if(item[1]=="3"){re_info={colors:'#246732',bgcolors:'#CAF5D3',infos:'倍数超限额，被调整为最大可投注倍数！'};}
	if(item[1]=="4"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注失败！'};}
	if(item[1]=="5"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'已临近截止时间，请购买下一期！'};}
	if(item[1]=="6"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'已过销售时间！'};}
	if(item[1]=="7"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'登陆超时，请退出重新登陆！'};}
	if(item[1]=="8"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注金额空，请刷新后重试！'};}
	if(item[1]=="9"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注内容空，请刷新后重试！'};}
	if(item[1]=="10"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'余额不足！'};}
	if(item[1]=="11"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注信息有误，请刷新后重试！'};} 
	if(item[1]=="12"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'投注注数超过活动限制！'};} 
	if(item[1]=="13"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'本项目正在维护中，请选择其它项目投注！'};} 
	if(item[1]=="20"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'早上七点到八点间系统例行维护！'};} 
	if(item[1]=="33"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'下注失败，请联系上级！'};} 
	if(item[1]=="34"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'只有五星四星可以用厘模式！'};} 
	if(item[1]=="35"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'奖金模式错误，请刷新重试或联系上级！'};} 
	if(item[1]=="36"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:'下注金额有误，请重试！'};} 
	if(item[1]=="37"){re_info={colors:'#C2130E',bgcolors:'#FBD2D2',infos:item[2]};} 
	return re_info;
}

function jixuang(i){
	var cfarr = new Array(0,1,2,3,4,5,6,7,8,9);
	for(d3=0; d3<i; d3++){
		selists2=new Array();
		var num = [1];
		var cf = 1;
		var wz = [100];
		var nbarr = new Array();
		if(rebatekey == 'k3'){
			nbarr = new Array(0,1,2,3,4,5);
		}else if(rebatekey == 'klsf'){
			nbarr = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19);
		}else if(rebatekey == '11x5'){
			nbarr = new Array(0,1,2,3,4,5,6,7,8,9,10);
		}else{
			nbarr = new Array(0,1,2,3,4,5,6,7,8,9);
		}
		var fs = 1;
		var maxN = 0;
		var minN = 0;
		var dbn = 0;
		var jizh = 0;
		switch(nowPlayKey){
			case '3X2_z3':case '3X1_z3':case '3X3_z3':case 'BDW_hsem':case 'BDW_qsem':case 'BDW_sxem':case 'BDW_wxem':case 'RX3_z3':case '3X4_z3':case '2X3_2_2xzxfs':case '2X3_1_2xzxfs':case 'klx2_lzu':case '4X_z6':case 'RX2_zxfs':case 'RX4_z6':
			num = [2];
			cf = 0;
			break;
			case '3X2_z6':case '3X1_z6':case '3X3_z6':case 'BDW_wxsm':case 'RX3_z6':case '3X4_z6':case 'klx3_qzu':case 'klx3_hzu':
			num = [3];
			cf = 0;
			break;
			case 'k3sbth_dx':
			num = [3];
			cf = 0;
			break;
			case 'k3ebth_ds':
			num = [2];
			cf = 0;
			break;
			
			case 'k3eth_ds':case 'k3ebth_dt':case 'k3x1_dx':case 'klx2_lzh':case 'klx3_qzh':case 'klx3_hzh':case 'cmc_mc2':case 'cmc_mc3':case 'cmc_mc4':case 'cmc_mc5':case 'cmc_mc6':case 'cmc_mc7':case 'cmc_mc8':case 'cmc_mc9':case 'cmc_mc10':case 'pkwz_q2':case 'pkwz_q3':case 'pkwz_q4':
			cf = 0;
			break;
			case '1X_dwd':
			wz = [Math.floor(Math.random()*5)];;
			break;
			case 'pkdwd_dxds':case 'pkdwd_dwd':
			wz = [Math.floor(Math.random()*10)];;
			break;
			case 'DWD_dwd':
			wz = [Math.floor(Math.random()*3)];;
			break;
			case 'RX2_zhxfs':case 'RX3_zhxfs':case 'RX4_zhxfs':
			var ttt3 = 0;
			var ttt4 = nowPlayKey.substr(2,1);
			while(ttt3 < ttt4){
				var ttt2 = Math.floor(Math.random()*5);
				if(wz.indexOf(ttt2)==-1){
					wz[ttt3] = ttt2;
					ttt3++;
				}
			}
			break;
			case 'BDW_hsym':case 'BDW_qsym':case 'BDW_sxym':case '5X_z10':case '5X_z5':case '4X_z4':case 'RX4_z4':
			cf = 0;
			break;
			case '3X2_zxhz':case '3X1_zxhz':case '3X3_zxhz':case '3X1_zhxhz':case '3X2_zhxhz':case '3X3_zhxhz':case 'RX3_zhxhz':case 'RX3_zxhz':case '3X4_zhxhz':case '3X4_zxhz':
			fs = 2;
			maxN = 25;
			break;
			case 'RX2_zxhz':case 'RX2_zhxhz':case '2X_1_2xzhxhz':case '2X_1_2xzxhz':case '2X_2_2xzhxhz':case '2X_2_2xzxhz':
			fs = 2;
			maxN = 16;
			break;

			case '5X_z120':case 'BDW_qsym':case 'BDW_sxym':
			num = [5];
			cf = 0;
			break;
			case 'RXX_rx1':case 'RXX_rx2':case 'RXX_rx3':case 'RXX_rx4':case 'RXX_rx5':case 'RXX_rx6':case 'RXX_rx7':
			fs = 2;
			cf = 0;
			maxN = 79;
			num = [nowPlayKey.substr(6,1)];
			break;
			case '5X_z60':
			num = [1,3];
			cf = 0;
			break;
			case 'klrx_rx2':case 'klrx_rx3':case 'klrx_rx4':case 'klrx_rx5':
			num = [nowPlayKey.substr(7,1)];
			cf = 0;
			break;
			case '4X_z24':case 'RX4_z24':
			num = [4];
			cf = 0;
			break;
			case '5X_z30':case '2X_2_2xzxfs':case '2X_1_2xzxfs':
			num = [2,1];
			cf = 0;
			break;
			case '5X_z20':case '4X_z12':case 'RX4_z12':
			num = [1,2];
			cf = 0;
			break;
			case '3M_zxfs':
			cf = 0;
			num = [3];
			break;
			case 'k3sbth_dt':
			num = [1,2];
			cf = 0;
			break;
			case '2M_zxfs':
			cf = 0;
			num = [2];
			break;
			case '3M_zxdt':
			cf = 0;
			num = [1,2];
			break;
			case 'RXDT_2z2':case 'RXDT_3z3':case 'RXDT_4z4':case 'RXDT_5z5':case 'RXDT_6z5':case 'RXDT_7z5':case 'RXDT_8z5':
			cf = 0;
			num = [1,nowPlayKey.substr(5,1)-1];
			break;
			
			case '3M_zhxfs':case '2M_zhxfs':case '2M_zxdt':case 'BDW2_bdw':
			cf = 0;
			break;
			case 'RXFS_fs1z1':case 'RXFS_fs2z2':case 'RXFS_fs3z3':case 'RXFS_fs4z4':case 'RXFS_fs5z5':case 'RXFS_fs6z5':case 'RXFS_fs7z5':case 'RXFS_fs8z5':
			cf = 0;
			num = [nowPlayKey.substr(7,1)];
			break;
			case '3X2_ds':case '3X1_ds':case '3X3_ds':case '3X4_ds':case 'RX3_zhxds':
			num = [3];
			maxN = 9;
			minN = 0;
			fs = 3;
			break;
			case '3X1_hhzx':case '3X2_hhzx':case '3X3_hhzx':case 'RX3_hhzx':case '3X4_hhzx':
			num = [3];
			maxN = 9;
			minN = 0;
			fs = 3;
			jizh = 111;
			break;
			
			case '3X1_z3ds':case '3X2_z3ds':case '3X3_z3ds':case 'RX3_z3ds':
			num = [2];
			maxN = 9;
			minN = 0;
			fs = 3;
			cf = 0;
			dbn = 1;
			break;
			case '3X2_z6ds':case '3X1_z6ds':case '3X3_z6ds':case 'RX3_z6ds':
			num = [3];
			maxN = 9;
			minN = 0;
			cf = 0;
			fs = 3;
			break;
			case '2X_1_zhxds':case '2X_2_zhxds':case 'RX2_zhxds':
			num = [2];
			maxN = 9;
			minN = 0;
			fs = 3;
			break;
			case '2X_1_zxds':case '2X_2_zxds':case 'RX2_zxds':
			num = [2];
			maxN = 9;
			cf = 0;
			minN = 0;
			fs = 3;
			break;
			case 'RX4_ds':case '4X_ds':
			num = [4];
			maxN = 9;
			minN = 0;
			fs = 3;
			break;
			case '5X_ds':
			num = [5];
			maxN = 9;
			minN = 0;
			fs = 3;
			break;
			
			case '3M_zhxds':case '3M_zxds':case '2M_zhxds':case '2M_zxds':
			num = [nowPlayKey.substr(0,1)];
			maxN = 11;
			minN = 1;
			cf = 0;
			fs = 3;
			break;
			
			case 'RXDS_8z5':case 'RXDS_7z5':case 'RXDS_6z5':case 'RXDS_5z5':case 'RXDS_5z5':case 'RXDS_4z4':case 'RXDS_3z3':case 'RXDS_2z2':case 'RXDS_1z1':
			num = [nowPlayKey.substr(5,1)];
			maxN = 11;
			minN = 1;
			cf = 0;
			fs = 3;
			break;
			
			case 'CMCDS_q2':case 'CMCDS_q3':case 'CMCDS_q4':case 'CMCDS_q5':
			num = [nowPlayKey.substr(7,1)];
			maxN = 10;
			minN = 1;
			cf = 0;
			fs = 3;
			break;
		}
		var b = 0;
		if(fs == 1){
			$("#lt_selector .ballcircle").each(function(d){
				if(num[d] == undefined){
					nums = num[0];
				}else{
					nums = num[d];
				}
				if(wz[0]<100 && wz.indexOf(d)==-1){
					selists2[d] = new Array();
				}else{
					selists2[d]=new Array();
					for(d2=0; d2<nums; d2++){
						if(cf == 0){
							var x = nbarr.length;
							var r2 = Math.floor(Math.random()*x);
							r = nbarr[r2]
							delete nbarr[r2];
							var z4 = 0;
							var nbarr2 = [];
							for(var z3 in nbarr){
								if (typeof nbarr[z3] == 'number'){
									nbarr2[z4] = nbarr[z3];
									z4++;
								}else{
									break;
								}
							}
							nbarr = nbarr2;
						}else{
							var x = $(this).find('li').length;
							var r = Math.floor(Math.random()*x);
						}
						var rrrr = $(this).children('li:eq('+r+')').find('strong').html();
						if(rrrr == undefined){
							rrrr = $(this).children('li:eq('+r+')').find('div').html();
						}
						selists2[d][d2] = rrrr;
					}
					selists2[d].sort(function(a,b){return a>b?1:-1});
				}
			});
		}else if(fs == 2){
			selists2[0] = new Array();
			if(maxN == 79){selists2[1] = new Array();}
			var fs2 = 0;
			while(true){
				if(fs2 < num[0]){
					var r = Math.floor(Math.random()*maxN)+1;
					var rv = $("#select_0_"+r).find('div').html();
					if(selists2[0].indexOf(rv) == -1){
						selists2[0][fs2] = $("#select_0_"+r).find('div').html();
						fs2++;
					}
				}else{
					break;
				}
			}
			selists2[0].sort(function(a,b){return a>b?1:-1});
		}else if(fs == 3){
			selists2 = new Array();
			var fs2 = 0;
			
			while(true){
				if(fs2 < num[0]){
					var r = Math.floor(Math.random()*maxN);
					
					if(fs2 == 0){
						
					}
					
					
					if(maxN > 9 && r<10){
						if(r<9) r++;
						if(gamekey != 'BJPK10'){
							r = '0'+r;
						}
					}
					if(jizh > 0 && r%jizh==0){
						continue;
					}
					if(nowPlayKey.indexOf('hhzx') > 0){
						if(selists2.length == 2){
							var hi2 = true;
							for(var hi in selists2){
								if(isNaN(hi)){
									continue;
								}
								if(selists2[hi] != r){
									hi2 = false;
								}
							}
							
							if(hi2 == false){
								selists2[fs2] = r;
								fs2++;
							}
						}else{
							selists2[fs2] = r;
							fs2++;
						}
					}else if(cf == 0){
						if(selists2.length==0 || selists2.indexOf(r) == -1){
							selists2[fs2] = r;
							fs2++;
						}
					}else{
						selists2[fs2] = r;
						fs2++;
					}
				}else{
					break;
				}
			}
			if(dbn == 1){
				var sn = selists2.length;
				selists2[sn] = selists2[Math.floor(Math.random()*(sn-1))];
			}
			if(nowPlayKey.indexOf('_z')){
				selists2.sort(function(a,b){return a>b?1:-1});
			}
			if(selists2[0] == selists2[selists2.length]){
				if(selists2[0] == 0){
					selists2[selists2.length] = selists2[selists2.length]+1;
				}else{
					selists2[0] = selists2[0]-1;
				}
			}
			
			
			if(maxN > 9){
				selstr = selists2.join(' ');
			}else{
				selstr = selists2.join('');
			}
		}
		if(fs == 3){
			var nums = 1;
		}else{
			var nums = count_select(selists2,1);
		}
		var times=selplay.times;
		
		var modes=$('#lt_project_modes').val();
		selplay.modes = "元";
		if(modes==""){modes="yuan";selplay.modes = "元";}
		if(modes=="yuan"){moneys=nums*times*2;selplay.modes = "元";}
		if(modes=="jiao"){moneys=nums*times*2/10;selplay.modes = "角";}
		if(modes=="fen"){moneys=nums*times*2/100;selplay.modes = "分";}
		if(modes=="li"){moneys=nums*times*2/1000;selplay.modes = "厘";}
		if(fs == 3){
			var dddd = boxinsertline(0,1,selstr,nums*fanganNum,moneys*fanganNum);
		}else{
			var dddd = selinsertline(0,1,selists2,nums,moneys);
		}
		if(dddd != 1){
			break;
		}
	}
}
function bindChangeHandler(input,fun) {
	if("onpropertychange" in input) {//IE6、7、8，属性为disable时不会被触发
		input.onpropertychange = function() {
			if(window.event.propertyName == "value") {
				if(fun) {
					fun.call(this,window.event);
				}
			}
		}
	} else {
		//IE9+ FF opera11+,该事件用js改变值时不会触发，自动下拉框选值时不会触发
		input.addEventListener("input",fun,false);
	}
}

function showOverThis(i,o){
	if(i == 1){
		$(o).height(290);
	}else if(i == 2){
		$(o).height(85);
	}else if(i == 4){
		$(o).height(110);
	}else if(i == 3){
		$(o).height('auto');
	}
}

function changitem(i){
	$("#tabstit .current").removeClass('current');
	$("#tabstit li:eq("+i+")").addClass('current');
	$("#tabsconitem .dblist").hide();
	$("#tabsconitem .dblist:eq("+i+")").show();
	if(i == 2){
		if($("#winreport .tbody").html() == ''){
			$("#winreport .tbody").html('<div class="nodata">数据加载中...</div>');
		}
		getUserWinRepot();
	}else if(i > 2){
		$("#tabsconitem .dblist:eq(3)").show();
		if($("#orderslist .tbody").html() == ''){
			$("#orderslist .tbody").html('<div class="nodata">数据加载中...</div>');
		}
		getUserOrders(i);
	}
}

function getUserWinRepot(){
	$.getJSON('?a=lotto&m=getUserWinRepot',function(db){
		innerHTML = '<ul>';
        innerHTML += '<li class="li_1">'+(db['db']['xz']!=undefined?db['db']['xz']:'0.00')+'</li>';
        innerHTML += '<li class="li_2">'+(db['db']['zj']!=undefined?db['db']['zj']:'0.00')+'</li>';
        innerHTML += '<li class="li_3">'+(db['db']['fd']!=undefined?db['db']['fd']:'0.00')+'</li>';
        innerHTML += '<li class="li_4">'+(db['db']['hd']!=undefined?db['db']['hd']:'0.00')+'</li>';
        innerHTML += '<li class="li_5">'+(db['db']['yl']!=undefined?db['db']['yl']:'0.00')+'</li>';
        innerHTML += '<li class="li_6">'+(db['db']['hl']!=undefined?db['db']['hl']:'0.00')+'</li>';
        innerHTML += '</ul>';
		$("#winreport div").html(innerHTML);
	});
	
}

function getUserOrders(i){
	$.getJSON('?a=lotto&m=getUserOrders&type='+i,function(db){
		innerHTML = '';
		for(var i in db['db']){
			var d = db['db'][i];
			if(typeof d != "object") { continue;}
			innerHTML += '<ul>';
			innerHTML += '<li class="li_1">'+(d['accountid'])+'</li>';
			innerHTML += '<li class="li_2">'+(d['creatdate'])+'</li>';
			innerHTML += '<li class="li_3">'+(d['name'])+'</li>';
			innerHTML += '<li class="li_4">'+(d['moneys']>0?d['moneys']:'')+'</li>';
			innerHTML += '<li class="li_5">'+(d['moneys']>0?'':d['moneys'])+'</li>';
			innerHTML += '<li class="li_6">'+(d['befor'])+'</li>';
			innerHTML += '<li class="li_7">'+(d['hig_amount'])+'</li>';
			innerHTML += '</ul>';
		}
		if(innerHTML == ''){
			$("#orderslist .tbody").html('<div class="nodata">暂无数据</div>');
		}else{
			$("#orderslist .tbody").html(innerHTML);
		}
	});
}






