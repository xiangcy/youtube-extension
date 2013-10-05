var song_storage;

$(function() {
  song_storage = song_storage_controller();
  song_storage.loadSongs();
});