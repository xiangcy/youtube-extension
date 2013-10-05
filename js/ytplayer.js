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
    videoId: 'sJQYoGyEtDs',
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) { 
  playVideo();
}

function playVideo() {
  player.playVideo();
  status = "PLAYING";
}

function stopVideo() {
  player.stopVideo();
  status = "PAUSED";
}

function getPlayer() {
  return player
}

function getStatus() {
  return status;
}