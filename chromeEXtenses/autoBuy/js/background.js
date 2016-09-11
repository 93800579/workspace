chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == 'watchdog') {
        sendMessage();
    }
});
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) { 
        console.log(request); 
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
    chrome.tabs.query({ index:0}, function(tabs) {
        if(tabs&&tabs.length>0){
        chrome.tabs.sendMessage(tabs[0].id, { message: "begin" }, function(response) {
            //$("#hello").text(response.farewell);
        });
        }
        else{
            console.log('can not find');
            alert('未找到指定的页面');
            chrome.alarms.clearAll(function(s){
            });
        }
    });
};
