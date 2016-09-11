chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.message == "begin") {
            sendResponse({ farewell: "goodbye" });
            initAllNeed();
            //开始

        } else {
            console.log("rev......error");
        }
    });
/**
 * 初始化状态
 * @return {[type]} [description]
 */
var setting = { limitRest: false, maxReTry: 7, minRest: 0.5, arraySize: 5 };
var initAllNeed = function(callback) {
    changeIds();
    //初始化setting
    //
    var arr = ['limitRest', 'maxReTry', 'minRest', 'arraySize'];
    chrome.storage.local.get(arr, function(obj) {
        if (obj)
            setting = obj;
        if (setting.arraySize > 5)
            setting.arraySize = 5;
        beginOrder();
    });
};



var beginOrder = function() {
    var soo = op();
    soo.orderNow();
};


var triggerClick = function(domId) {
    var dom = document.getElementById(domId);
    if (dom)
        dom.click();
};


/**
 * 把id 按需求改变
 * 
 * @return {[type]} [description]
 */
var changeIds = function() {
    $(".ball-control li").each(function(index) {
        var at = ($(this).children("a").attr('onclick'));
        at = at.replace("selectMore(", '').replace(")", '');
        var atArrays = at.split(",");
        var oldId = $(this).children("a").attr('id');
        if (oldId.length < 5) {
            $(this).children("a").attr('id', oldId + "_" + atArrays[1].replace(/'/g, ''));
        }

    });
};

//var arrays = [0, 0, 0, 0, 0];
var arrays = new Array();
var tryTimes = 0; //如果没中，重试了几次
var op = function() {

    var countHitory = function() {

        arrays = Array();
        for (i = 0; i < Math.round(setting.arraySize); i++) {
            arrays[i] = 0;
        }
        $("#historylot li").each(function(index) {
            var titils = $(this).attr('title');
            var title = titils.split(',');
            for (i = 0; i < Math.round(setting.arraySize); i++) {
                var toInt = parseInt(title[i]);
                if (toInt > 4) {
                    arrays[i] = arrays[i] + 1;
                } else {
                    arrays[i] = arrays[i] - 1;
                }
            }
        })
    };
    var checkNowStatus = function() {
        var lostMoney = $("#lostmoney", parent.document).text();
        var numberMoney = 0;
        var lagger = $("#historylot li").size() > 3;
        try {
            numberMoney = parseFloat(lostMoney);
        } catch (e) {
            console.log(e);
        }

        var doms = $("#get_project_list ul:first");
        var lastStatus = 0;
        if (doms) {
            var childrenLi = doms.children(".li_9");
            if (childrenLi) {
                var loftStatus = childrenLi.text();
                if ('未中奖' == loftStatus) {
                    lastStatus = -1;
                } else if ('中奖' == loftStatus) {
                    lastStatus = 1;
                }

            }
        } else {
            lastStatus = 1;
        }
        return { 'lostMoney': numberMoney, 'lastStatus': lastStatus, 'lagger': lagger };
    };

    var jiabei = function(isUp) {
        var size = Math.pow(2, isUp);
        console.log(size);
        if (isUp > 0) {
            $("#lt_sel_times").val(size - 1);
            var domm = $("#customAdd .add").trigger('click');
            console.log("uping........");
        } else {
            $("#lt_sel_times").val('2');
            console.log("set down.......");
            var domm = $("#customAdd .sub").trigger('click');
        }
    };
    var removeAlarm = function() {
        chrome.runtime.sendMessage({ message: 'reset' }, function(response) {
            //$("#hello").text(response.farewell);
        });
    };
    var orderNow = function() {
        varNow = checkNowStatus();
        console.log(varNow);
        console.log(tryTimes);

        if (varNow.lostMoney <= 0) {
            alert('there is no money');
            removeAlarm();
            return false;
        }
        if (setting.limitRest && varNow.lostMoney <= setting.minRest) {
            alert('当前余额小于设定值');
            removeAlarm();
            return false;
        }
        if (!varNow.lagger) {
            console.log('当前不足4条记录无法判断');
            return fasle;
        }
        if (varNow.lastStatus == 0 || varNow.lastStatus == 1 || tryTimes >= setting.maxReTry || (tryTimes == 0 && varNow.lastStatus != -1)) {
            countHitory();
            jiabei(0);
            tryTimes = 0;
        } else {

            if (tryTimes == 0)
                countHitory();
            tryTimes = tryTimes+1;
            jiabei(tryTimes);
            
        }
        console.log(arrays);
        for (var i in arrays) {
            var s = arrays[i];
            var domId = 'do_' + i;
            if (s > 0)
                domId = domId + "_2";
            else
                domId = domId + "_1";

            triggerClick(domId);
        }
        var myDate = new Date()
        console.log('时间是：' + myDate.getHours() + ":" +
            myDate.getMinutes() + ":" + myDate.getSeconds());
        triggerClick('lt_sendok');
    };

    return { "orderNow": orderNow };
};
$(function() {
    console.log("iam runngin....");
});
