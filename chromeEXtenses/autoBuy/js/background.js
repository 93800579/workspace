chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == 'watchdog') {
        sendMessage();
    }
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {  
        if (request.message == "autobegin") {
        	sendMessage();
            chrome.alarms.onAlarm.addListener(sendMessage);
        }
        else if(request.message == "reset" ){
        	chrome.alarms.clearAll(function(s){

        	});
        }
        else if(request.message =="single"){
        	sendMessage();
        }
    });


var sendMessage = function() {
    chrome.tabs.query({ url: 'http://vip2.bcniucai.com/client/index.php' }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "begin" }, function(response) {
            //$("#hello").text(response.farewell);
        });
    });
};
