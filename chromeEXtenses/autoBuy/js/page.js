var bag = 0;

var testBegin = function() {
    chrome.alarms.get('watchdog', function(al) {
        if (al) {
            $("#btn3").text('停止');
            addBag("ON");
        } else {
            addBag("");
        }
    });

    $("#btn2").bind("click", function() {
        sendMessageBegin('single');
    });
    $("#btn3").bind("click", function() {
        if ($("#btn3").text() == '自动选择') {
            bag = 0;
            sendMessageBegin('autobegin');
            autoOrder();
            $("#btn3").text('停止');
            addBag("ON");
        } else {
            chrome.alarms.clearAll(function(wasCleared) {
                var tt = "";
                if (wasCleared) {
                    tt = '已经停止以后的自动执行';
                } else {
                    tt = '清除失败，请使用刷新当前页面的方式结束';
                }
                $("#hello").text(tt);
            });
            $("#btn3").text('自动选择');
            addBag("");
        }

    });

    $("#btn5").bind("click", function() {
        chrome.tabs.query({url: "chrome-extension://ndhakcpigoeibmajaclkeoomphhidhdi/html/options.html"}, function(tab) {
            if (tab&&tab.length>0) {
            	
            } else {
                chrome.tabs.create({ "url": "html/options.html" }, function(tab) {
                    console.log(tab);
                    $("#hello").text(tab.id);
                });
            }
        });


    });
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "reset") {
             $("#btn3").text('自动选择');
            addBag("");
        }
    });
};


var autoOrder = function() {
    chrome.alarms.create('watchdog', { periodInMinutes: 1.5 });

}
var addBag = function(content) {
    chrome.browserAction.setBadgeText({ 'text': content });
};
var sendMessageBegin = function(messageContent) {
    chrome.runtime.sendMessage({ message: messageContent }, function(response) {
        //$("#hello").text(response.farewell);
    });

};
window.onload = testBegin;
