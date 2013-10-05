 <tr><td><a href="#">song 1</a><a href="#"><span class="icon-remove"></span></a></td></tr>
$(function(){
  var song_list_div = $('#songTable');
  var key_list = chrome.extension.getBackgroundPage().song_storage.get_list();
  for (var i = 0; i < key_list.length; i++) {
    song_list_div.append("<tr><td>" + key_list[i] + "</td></tr>");
  }

  var $addlist = $('#addlist');

  var url;
  chrome.tabs.query({active:true, currentWindow:true}, function(tab) {
    var tabID=tab[0].id;
    chrome.tabs.get(tabID, function(tab){
      url = tab.url;
      if ( url.indexOf("youtube.com") === -1 ){
        $addlist.css("display", "none");
      }

      var params = url.substr(url.indexOf("?") + 1);
      var sval = "";
      params = params.split("&");
      for (var i = 0; i< params.length; i++) {
        temp = params[i].split("=");
        if ( [[temp[0]]] == "v" ) { sval = temp[1]; }
      }

      if ( sval == "" ){
        $addlist.css("display", "none");
      }

      $addlist.click(function(){
        song_list_div.prepend("<tr><td>" + sval + "</td></tr>");
        chrome.extension.getBackgroundPage().song_storage.saveSongs(sval);
      });

    });
  });

  $(document).on('click', '.delete-icon', function(){
    var note_div = $(this).closest('tr');
    note_div.fadeOut();
    chrome.extension.getBackgroundPage().song_storage.deleteSongs(sval);
  });

});
