var races = ['aasimar', 'alleykin', 'arcanite', 'beastblooded', 'darkelf', 'dragonspawn', 'dwarf', 'forgeborn', 'gnome', 'halfelf', 'halforc', 'halfling', 'highelf', 'human', 'lizardfolk', 'unholyone', 'spiritborn', 'tiefling', 'woodelf'];

populate = function () {
  var container = $('.row');
  console.log(container.id);

  var gridItems = (function (id) {  
    switch (id) {
      case 'races':
        return races;
      default:
        return [];
    }
  })(container.id);

  for (var i = 0; i < gridItems.length ; i++) {
    var item = gridItems[i], div;
    div = document.createElement('div');
    div.innherHTML = gridItems[i];
    div.classList.add('col');
    container.appendChild(div);
  };
};
