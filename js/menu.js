$(function(){
  var buttons = document.getElementsByTagName('button');
  for(var i = 0, len = buttons.length; i < len; i++) {
    buttons[i].onclick = function () {
      changeContents(this.id);
    }
  }
  
  changeContents = function(id) {
    selected = document.getElementsByClassName('selected');
    for (i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    };
    
    link = jQuery(document.getElementById(id));
    link.parent().addClass('selected');
    
    var module = 'modules/' + id + '.html';
    $('title').load(module + ' title', '', function() {
      document.title = $(this).text();
      $(".contentPane").load(module + ' .main');
    });
    
    window.location.hash = id;
  };
  
  if(window.location.hash) {
    changeContents(window.location.hash.substr(1));
  } else {
    window.location.hash = 'home';
  }
  
  window.onhashchange = function() {
    changeContents(window.location.hash.substr(1));
  };
});
