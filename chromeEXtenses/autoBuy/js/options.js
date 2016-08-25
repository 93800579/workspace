$(function() {
    $("#saveButton").on("click", function() {
        saveSetting();

    });
     $("#clearButton").on("click", function() {

     	var arr = ['limitRest', 'maxReTry', 'minRest','arraySize'];
        chrome.storage.local.remove(arr,function(){
        	$(":checked").attr('checked',false);
        	$("#form1")[0].reset();
        });

    });
    var names = new Array();
    $("input").each(function(index) {
        names[index] = $(this).attr('name');
    });
    console.log(name);
    chrome.storage.local.get(function(obj) {
        console.log(obj);
        $("input").each(function(index) {
            if ($(this).attr('type') != 'checkbox') {
                $(this).val(obj[$(this).attr('name')]);
            } else {

                $(this).attr('checked', obj[$(this).attr('name')]);
            }
        });

    });
});

var saveSetting = function() {
    var opt = {};
    $("input").each(function(index) {
        var type = $(this).attr('type');
        var name = $(this).attr('name');
        if ('checkbox' == type) {
            opt[name] = $(this).is(':checked');
        } else if ('input' == type) {
            opt[name] = $(this).val();
        } else if ('number' == type) {
            opt[name] = parseFloat($(this).val());
        }
    });
    console.log(opt);
    chrome.storage.local.set(opt, function() {
        alert("保存成功");
    });
    return true;
};
