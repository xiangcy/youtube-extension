$(function(){
	chrome.tabs.query({active:true, currentWindow:true},function(tab) {
	var tabID=tab[0].id
	chrome.tabs.get(tabID, function(tab){
		var url=tab.url;
	});
	});
});

$(function(){
  var song_list_div = $('#songTable');
  var key_list = chrome.extension.getBackgroundPage().song_storage.get_list();
  for (var i = 0; i < key_list.length; i++) {
    song_list_div.append("<tr><td>" + key_list[i] + "</td></tr>");
  }
});
