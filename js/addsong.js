//$(function(){
	chrome.tabs.query({active:true, currentWindow:true},function(tab) {
		var tabID=tab[0].id

	  	alert(chrome.tabs.get(tabID));
    });
//});