$(function(){
  var buttons = document.getElementsByTagName('button');
  for(var i = 0, len = buttons.length; i < len; i++) {
    buttons[i].onclick = function () {
      menuClick(this.id);
    }
  }
  
  var menuClick = function(id) {
    window.location.hash = id;
  };

  var changeContents = function(id) {
    var module = 'modules/' + id + '.html';
    $('title').load(module + ' title', '', function() {
      document.title = $(this).text();
      $('.contentPane').load(module + ' .main', () => {
        var selected = document.getElementsByClassName('selected');
        for (i = 0; i < selected.length; i++) {
          selected[i].classList.remove('selected');
        };
        
        var link = $('#' + id);
        link.parent().addClass('selected');

        if (id == 'abilities') {
          return init_abilities();
        } else {
          return populate();
        }
      });
    });
  };
  
  if(window.location.hash) {
    var hsh = window.location.hash;
    changeContents(hsh.substr(1));
  } else {
    window.location.hash = 'home';
  }
  
  window.onhashchange = function() {
    changeContents(window.location.hash.substr(1));
  };
});
