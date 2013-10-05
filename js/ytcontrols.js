$(document).ready(function(){
	$( "#ytplay" ).click(function() {
	  chrome.extension.getBackgroundPage().playVideo();
	});

	$( "#ytpause" ).click(function() {
	  chrome.extension.getBackgroundPage().stopVideo();
	});
}); 