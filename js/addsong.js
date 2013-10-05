//$(function(){
	chrome.tabs.query({active:true, currentWindow:true},function(tab) {
		var tadID=tab[0].id

	  	alert(chrome.tabs.get(tabID));
    });
//});