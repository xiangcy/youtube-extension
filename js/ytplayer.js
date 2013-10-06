var tag = document.createElement('script');

tag.src = "js/api_yt_iframe.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var i = -1;
var shuffle = false;

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
    playSpec(0);
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
    if(!shuffle){
      i = (song_storage.get_list().length + i + 1) % song_storage.get_list().length;
    } else {
      i = Math.floor(Math.random() * song_storage.get_list().length);
    }
    playSpec(i);
  }
  else {
    playVideo();
  }
}

function playPrev() {
  if(song_storage.get_list().length > 0) {
    if(!shuffle){
      i = (song_storage.get_list().length + i + 1) % song_storage.get_list().length;
    } else {
      i = Math.floor(Math.random() * song_storage.get_list().length);
    }
    playSpec(i);
  }
  else {
    playVideo();
  }
}

function playSpec(index){
    i = index;
    player.loadVideoById(song_storage.get_list()[i]);
    status = "PLAYING";
}

function toggleShuffle(){
  shuffle = !shuffle;
}

function getPlayer() {
  return player
}

function nowPlaying() {
  return i;
}

function getStatus() {
  return status;
}