$(document).ready(function(){
	if(chrome.extension.getBackgroundPage().getStatus() == "PAUSED"){
	  $("#ytpause").hide();
	  $("#ytplay").show();
	}	

	if(chrome.extension.getBackgroundPage().getStatus() == "PLAYING"){
	  $("#ytplay").hide();
	  $("#ytpause").show();
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
	});
}); 

