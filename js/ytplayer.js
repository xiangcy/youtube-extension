var tag = document.createElement('script');

tag.src = "js/api_yt_iframe.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var shuffle = false;

curKey = 'E9XQ2MdNgKY';

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
    playSpec(song_storage.get_list()[0]);
    stopVideo();
  } else {
    //do nothing, no video
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

function getCurrentIndex() {
  for (ii = 0; ii < song_storage.get_list().length; ii++){
    if (song_storage.get_list()[ii] == curKey){
      return ii;
    }
  }
  return 0;
}

function playNext() {
  if(song_storage.get_list().length > 0) {
    if(!shuffle){
      i = getCurrentIndex();
      i = (song_storage.get_list().length + i + 1) % song_storage.get_list().length;
    } else {
      i = Math.floor(Math.random() * song_storage.get_list().length);
    }
    playSpec(song_storage.get_list()[i]);
  }
  else {
    //do nothing
  }
}

function playPrev() {
  if(song_storage.get_list().length > 0) {
    if(!shuffle){
      i = getCurrentIndex();
      i = (song_storage.get_list().length + i - 1) % song_storage.get_list().length;
    } else {
      i = Math.floor(Math.random() * song_storage.get_list().length);
    }
    playSpec(song_storage.get_list()[i]);
  }
  else {
    //do nothing
  }
}

function playSpec(key){
    curKey = key;
    player.loadVideoById(key);
    status = "PLAYING";
}

function shuffleState(){
  return shuffle;
}

function toggleShuffle(){
  shuffle = !shuffle;
}

function getPlayer() {
  return player
}

function nowPlaying() {
  return curKey;
}

function getStatus() {
  return status;
}