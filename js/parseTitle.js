var getTitle=function(url){
	var output;
	$.getJSON(url,function(json){
		output=json.data.title;
		return output;
	});
};