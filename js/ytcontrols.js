$(document).ready(function(){
	if(chrome.extension.getBackgroundPage().getStatus() == "PAUSED"){
	  $("#ytpause").hide();
	  $("#ytplay").show();
	}	

	if(chrome.extension.getBackgroundPage().getStatus() == "PLAYING"){
	  $("#ytplay").hide();
	  $("#ytpause").show();
	}	

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
}); 