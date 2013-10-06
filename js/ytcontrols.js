$(document).ready(function(){
	if(chrome.extension.getBackgroundPage().getStatus() == "PAUSED"){
	  $("#ytpause").hide();
	  $("#ytplay").show();
	}	

	if(chrome.extension.getBackgroundPage().getStatus() == "PLAYING"){
	  $("#ytplay").hide();
	  $("#ytpause").show();
	}

	if(chrome.extension.getBackgroundPage().shuffleState()){
	  $("#ytshuffle").hide();
	  $("#ytshufflet").show();	
	}

	if(!chrome.extension.getBackgroundPage().shuffleState()){
	  $("#ytshufflet").hide();
	  $("#ytshuffle").show();	
	}

	$( "#ytvolume" ).val(chrome.extension.getBackgroundPage().getPlayer().getVolume());

	$( "#ytvolume" ).change(function() {
	  chrome.extension.getBackgroundPage().getPlayer().setVolume($( "#ytvolume" ).val());
	});	

	$( "#ytplay" ).click(function() {
	  chrome.extension.getBackgroundPage().playVideo();
	  $("#ytplay").hide();
	  $("#ytpause").show();
	});

	$( "#ytpause" ).click(function() {
	  chrome.extension.getBackgroundPage().stopVideo();
	  $("#ytpause").hide();
	  $("#ytplay").show();
	});

	$( "#ytprev" ).click(function() {
	  chrome.extension.getBackgroundPage().playPrev();
  	  $("#ytplay").hide();
	  $("#ytpause").show();
	});

	$( "#ytnext" ).click(function() {
	  chrome.extension.getBackgroundPage().playNext();
  	  $("#ytplay").hide();
	  $("#ytpause").show();
	});

	$( "#ytshuffle" ).click(function() {
	  chrome.extension.getBackgroundPage().toggleShuffle();
	  $("#ytshuffle").hide();
	  $("#ytshufflet").show();
	});

	$( "#ytshufflet" ).click(function() {
	  chrome.extension.getBackgroundPage().toggleShuffle();
	  $("#ytshufflet").hide();
	  $("#ytshuffle").show();
	});

	$( ".title_field" ).click(function() {
	  var key = $(this).attr('id').replace(/song/, '');
	  chrome.extension.getBackgroundPage().playSpec(key);
	});
}); 

$(document).ready( function() {
	function pad (time, max) {
	  return time.toString().length < max ? pad("0" + time.toString(), max) : time.toString();
	}

	var update = function() {
		if (chrome.extension.getBackgroundPage().song_storage.get_list().length == 0){
			chrome.extension.getBackgroundPage().stopVideo();
			$("#bigtitle").text("No videos in list - click me when watching a YouTube video!");
			$("#elapsedtime").text("No video");
			$("#totaltime").text("interest here :[");
			return;
		}

    	esec = chrome.extension.getBackgroundPage().getPlayer().getCurrentTime();
		tsec = chrome.extension.getBackgroundPage().getPlayer().getDuration();

		$("#elapsedtime").text(Math.floor(esec/60) + ":" + pad(Math.floor(esec%60),2));
		$("#totaltime").text(Math.floor(tsec/60) + ":" + pad(Math.floor(tsec%60),2));

		var curKey = chrome.extension.getBackgroundPage().nowPlaying();

		var url = "http://gdata.youtube.com/feeds/api/videos/" + curKey + "?v=2&alt=jsonc";
	  	var output;
	  	$.getJSON(url,function(json){
	      output=json.data.title;
	      $("#bigtitle").text(output);
	  	});

	  	for ( ii = 0; ii < chrome.extension.getBackgroundPage().song_storage.get_list().length; ii++){
	  	  key = chrome.extension.getBackgroundPage().song_storage.get_list()[ii];
	  	  if( key == curKey) {
		  	$("#song"+key).parent("td").parent("tr").css("background-color","#ddd");
		  }
		  else {
		  	$("#song"+key).parent("td").parent("tr").css("background-color","white");
		  }
	  	}
	}

	update();
	setInterval(update, 500);
});

