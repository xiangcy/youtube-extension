	var url="http://gdata.youtube.com/feeds/api/videos/5ZIufl-pfrw?v=2&alt=jsonc";
	var output
	$.getJSON(url,function(json){
		var title=json.data.title;
		alert(title);
	});

