var tag = document.createElement('script');

tag.src = "js/api_yt_iframe.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var i = 0;

var player;
var status = "PAUSED";
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'E9XQ2MdNgKY',
    events: {
      'onReady': onPlayerReady,
      'onStateChange' : loadNext
    }
  });
}

function onPlayerReady(event) { 
  if(song_storage.get_list().length > 0) {
    player.loadVideoById(song_storage.get_list()[0]);
  } else {
    playVideo();
  }
}

function loadNext(event) {
  if(event.data == YT.PlayerState.ENDED){
    playNext();
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
  if(song_storage.get_list().length > 0) {
    i = (song_storage.get_list().length + i + 1) % song_storage.get_list().length;
    player.loadVideoById(song_storage.get_list()[i]);
    status = "PLAYING";
  }
  else {
    playVideo();
  }
}

function playPrev() {
  if(song_storage.get_list().length > 0) {
    i = (song_storage.get_list().length + i - 1) % song_storage.get_list().length;
    player.loadVideoById(song_storage.get_list()[i]);
    status = "PLAYING";
  }
  else {
    playVideo();
  }
}

function getPlayer() {
  return player
}

function getStatus() {
  return status;
}