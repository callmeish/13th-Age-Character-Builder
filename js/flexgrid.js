var races = ['aasimar', 'alleykin', 'arcanite', 'beastblooded', 'darkelf', 'dragonspawn', 'dwarf', 'forgeborn', 'gnome', 'halfelf', 'halforc', 'halfling', 'highelf', 'human', 'lizardfolk', 'spiritborn', 'tiefling', 'unholyone', 'woodelf'];
var classes = ['barbarian', 'bard', 'chaosmage', 'cleric', 'commander', 'druid', 'fighter', 'monk', 'necromancer', 'occultist', 'paladin', 'ranger', 'rogue', 'sorcerer', 'wizard'];

var populate = function() {
  var gridItems = (function (container) {
    if (!container) return [];
  
    switch (container.id) {
      case 'races':
        return races;
      case 'classes':
        return classes;
      default:
        return [];
    }
  })($('.d-flex')[0]);

  gridItems.forEach(function (item) {
    var expandButton, selectButton, expandedInfo, div;
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
      $('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
      });
      selectButton.innerHTML = itemJSON.name;
      selectButton.onclick = function () {
        switch (window.location.hash.substr(1)) {
          case 'races':
            window.sessionStorage.race = JSON.stringify(itemJSON);
            window.location.hash = 'classes';
            break;
          case 'classes':
            window.sessionStorage.class = JSON.stringify(itemJSON);
            window.location.hash = 'abilities';
            break;
          default:
            window.location.hash = 'home';
        }
      };
      div.appendChild(selectButton);

      expandButton = document.createElement('button');
      expandButton.classList.add('p-2');
      expandButton.classList.add('expandButton');
      expandButton.title = itemJSON.name + ' Detailed Info';
      expandButton.setAttribute('data-toggle', 'tooltip');
      expandButton.innerHTML = '<img src="menu.png" height="25px" width="25px"></img>';
      $(expandButton).click(function (event) {
        var flag = $(this).parent().hasClass('selectedBox')
        $('.visible').removeClass('visible');
        $('.selectedBox').removeClass('selectedBox');
        if (!flag) {
          $(this).siblings('.expInfo').addClass('visible');
          $(this).parent().addClass('selectedBox');
        };
        event.stopPropagation();
      });
      $('body').click(function () {
        $('.visible').removeClass('visible');
        $('.selectedBox').removeClass('selectedBox');
      });
      div.appendChild(expandButton);

      $(selectButton).tooltip();
      $(expandButton).tooltip();

      expandedInfo = document.createElement('div');
      expandedInfo.classList.add('expInfo');
      expandedInfo.innerHTML = '<h4>' + itemJSON.name + '</h4>';
      if ($('.d-flex')[0].id == "races") {
        if (itemJSON.name == "Human") {
          expandedInfo.innerHTML += '<p>Ability Score Bonus: +2 Any</p>';
        } else {
          expandedInfo.innerHTML += '<p>Ability Score Bonus: +2 ' + itemJSON.raceBonus1 + ' or +2 ' + itemJSON.raceBonus2 + '</p>';
        };
        expandedInfo.innerHTML += '<p>Racial Power - ' + itemJSON.racePowerName + ': ' + itemJSON.racePowerDesc + '</p>';
        if (itemJSON.passiveName) {
          expandedInfo.innerHTML += '<p>Passive - ' + itemJSON.passiveName + ': ' + itemJSON.passiveDesc + '</p>';
        };
        if (itemJSON.racePowerAdvFeat) {
          expandedInfo.innerHTML += '<p><i>Adventurer Feat</i>: ' + itemJSON.racePowerAdvFeat + '</p>';
        };
      } else if ($('.d-flex')[0].id == "classes") {
        expandedInfo.innerHTML += '<p>Ability Score Bonus: +2 ' + itemJSON.classBonus1 + ' or +2 ' + itemJSON.classBonus2 + '</p>';
        expandedInfo.innerHTML += '<p><i>' + itemJSON.writeup + '</i></p>';
        expandedInfo.innerHTML += '<p>Possible ' + itemJSON.name.toLowerCase() + ' backgrounds include: ' + itemJSON.backgrounds + '</p>';
        expandedInfo.innerHTML += '<p>For more details please see <a href="' + itemJSON.link + '" target="_blank">the 13th Age SRD</a>.</p>';
      };
      div.appendChild(expandedInfo);

      $('.d-flex')[0].appendChild(div);
    });
  });
};
