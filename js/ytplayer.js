var tag = document.createElement('script');

tag.src = "js/api_yt_iframe.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var status = "PAUSED";
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '6_ING1C747Y',
    events: {
      'onReady': onPlayerReady,
      'onStateChange' : loadNext
    }
  });
}

function onPlayerReady(event) { 
  player.setLoop(true);
  player.setShuffle(true);

  playVideo();
}

function loadNext(event) {
  if(event.data == YT.PlayerState.ENDED){
    player.loadVideoById("E9XQ2MdNgKY");
  }
}

function playVideo() {
  player.playVideo();
  status = "PLAYING";
}

function stopVideo() {
  player.stopVideo();
  status = "PAUSED";
}

function playNext() {
  player.loadVideoById("E9XQ2MdNgKY");
}

function playPrev() {
  player.loadVideoById("E9XQ2MdNgKY");
}

function getPlayer() {
  return player
}

function getStatus() {
  return status;
}