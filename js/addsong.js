$(function(){
	chrome.tabs.query({active:true, currentWindow:true},function(tab) {
	var tabID=tab[0].id
	chrome.tabs.get(tabID, function(tab){
		var url=tab.url;
	});
});
alert(url);
$("#addlist").click(function(){
	alert(url);
});
});
	

