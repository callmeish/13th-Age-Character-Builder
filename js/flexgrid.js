var races = ['aasimar', 'alleykin', 'arcanite', 'beastblooded', 'darkelf', 'dragonspawn', 'dwarf', 'forgeborn', 'gnome', 'halfelf', 'halforc', 'halfling', 'highelf', 'human', 'lizardfolk', 'unholyone', 'spiritborn', 'tiefling', 'woodelf'];

var populate = function() {
  var gridItems = (function (container) {
    if (!container) return [];
  
    switch (container.id) {
      case 'races':
        return races;
      default:
        return [];
    }
  })($('.d-flex')[0]);

  for (var i = 0; i < gridItems.length ; i++) {
    var item = gridItems[i], div, expandButton, selectButton, expandedInfo;
    $.getJSON('data/' + item + '.json', function (itemJSON) {
      div = document.createElement('div');
      div.classList.add($('.d-flex')[0].id + 'Box');
      div.classList.add('my-2');
      div.id = itemJSON.name.toLowerCase();

      selectButton = document.createElement ('button');
      selectButton.classList.add('p-2');
      selectButton.classList.add('selectButton');
      selectButton.title = itemJSON.blurb;
      selectButton.setAttribute('data-toggle', 'tooltip');
      selectButton.innerHTML = itemJSON.name;
      selectButton.onclick = function () {
        
      };
      div.appendChild(selectButton);

      expandButton = document.createElement('button');
      expandButton.classList.add('p-2');
      expandButton.classList.add('expandButton');
      expandButton.title = itemJSON.name + ' Detailed Info';
      expandButton.setAttribute('data-toggle', 'tooltip');
      expandButton.innerHTML = '<img src="menu.png" height="25px" width="25px"></img>';
      expandButton.onclick = function () {
        var flag = $(this).parent().hasClass('selectedBox')
        $('.visible').removeClass('visible');
        $('.selectedBox').removeClass('selectedBox');
        if (!flag) {
          $(this).siblings('.expInfo').addClass('visible');
          $(this).parent().addClass('selectedBox');
        };
      };
      div.appendChild(expandButton);

      $(selectButton).tooltip();
      $(expandButton).tooltip();

      expandedInfo = document.createElement('div');
      expandedInfo.classList.add('expInfo');
      expandedInfo.innerHTML =
        '<h4>Aasimar</h4>' +
        '<p>Ability Score Bonus: +2 ' + itemJSON.raceBonus1 + ' or +2 ' + itemJSON.raceBonus2 + '</p>' +
        '<p>Racial Power - ' + itemJSON.racePowerName + ': ' + itemJSON.racePowerDesc + '</p>';
      if (itemJSON.passiveName) {
        expandedInfo.innerHTML += '<p>Passive - ' + itemJSON.passiveName + ': ' + itemJSON.passiveDesc + '</p>';
      }
      div.appendChild(expandedInfo);

      $('.d-flex')[0].appendChild(div);
    });
  };
};
