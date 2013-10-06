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
	  var index = $(this).attr('id').replace(/song/, '');
	  chrome.extension.getBackgroundPage().playSpec(index);
	});
}); 

$(document).ready( function() {
	function pad (time, max) {
	  return time.toString().length < max ? pad("0" + time.toString(), max) : time.toString();
	}

	var update = function() {
    	esec = chrome.extension.getBackgroundPage().getPlayer().getCurrentTime();
		tsec = chrome.extension.getBackgroundPage().getPlayer().getDuration();

		$("#elapsedtime").text(Math.floor(esec/60) + ":" + pad(Math.floor(esec%60),2));
		$("#totaltime").text(Math.floor(tsec/60) + ":" + pad(Math.floor(tsec%60),2));

		var curIndex = chrome.extension.getBackgroundPage().nowPlaying();

		if(curIndex >= 0){
		  curKey = chrome.extension.getBackgroundPage().song_storage.get_list()[curIndex];
		  var url = "http://gdata.youtube.com/feeds/api/videos/" + curKey + "?v=2&alt=jsonc";
	  	  var output;
	  	  $.getJSON(url,function(json){
	      	output=json.data.title;
	      	$("#bigtitle").text(output);   
	  	  });

	  	  for ( ii = 0; ii < chrome.extension.getBackgroundPage().song_storage.get_list().length; ii++){
	  	  	if( ii == curIndex) {
		  	  	$("#song"+ii).parent("td").parent("tr").css("background-color","grey");
		  	}
		  	else {
		  		$("#song"+ii).parent("td").parent("tr").css("background-color","white");
		  	}
	  	  }
		}
	}

	update();
	setInterval(update, 500);
});

