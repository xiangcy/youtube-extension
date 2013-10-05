var song_storage_controller = function () {
  var key_list = [];

  var that = {};

  that.loadSongs = function() {
    chrome.storage.local.get({
      "key_list": {},
    }, function(storage) {
      if( Array.isArray(storage["key_list"]) ){
        key_list = storage["key_list"];
      } else {
        chrome.storage.local.set({
          "key_list": [],
        });
      }
    });
  };

  that.saveSongs = function(key) {
    key_list.push(key);
    chrome.storage.local.set({
      "key_list": key_list,
    });
  };

  that.get_list = function() {
    return key_list;
  }

  return that;
};

