var getTitle=function(key, song_div){
  var url = "http://gdata.youtube.com/feeds/api/videos/" + key + "?v=2&alt=jsonc";
  var output;
  $.getJSON(url,function(json){
    output=json.data.title;
    song_div.find('.title_field').text(output);   
  });
  return output;
};

var construct_song_div = function (key){
  var song_div = $('<tr><td><a class="key_field" href="#">' + key + '</a>' + '<a class="title_field" href="#">' 
          + '' + '</a><span class="icon-remove"></span></td></tr>');
  var title = getTitle(key, song_div);
  return song_div;
};
 
$(function(){
  var song_list_div = $('.table-body');
  var key_list = chrome.extension.getBackgroundPage().song_storage.get_list();
  for (var i = 0; i < key_list.length; i++) {
    song_list_div.append(construct_song_div(key_list[i]));
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
        song_list_div.append(construct_song_div(sval));
        chrome.extension.getBackgroundPage().song_storage.saveSongs(sval);
      });
    });
  });

  $(document).on('click', '.icon-remove', function(){
    var song_div = $(this).closest('tr');
    var key = $(song_div.find(".key_field")[0]).text();
    song_div.fadeOut();
    chrome.extension.getBackgroundPage().song_storage.deleteSongs(key);
  });

  song_list_div.sortable({
    update: function() {
      var new_key_list = [];
      $(".key_field").each(function() {
        new_key_list.push($(this).text());
        chrome.extension.getBackgroundPage().song_storage.reset(new_key_list);
      });
    }
  });

});
