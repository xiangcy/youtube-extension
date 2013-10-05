$( "ytplay" ).click(function() {
  chrome.extension.getBackgroundPage.player.playVideo();
});

$( "ytpause" ).click(function() {
  chrome.extension.getBackgroundPage.player.stopVideo();
}); 