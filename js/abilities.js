let point_total = 28;
let stat_names = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
let costs = { 
  "18": 16,
  "17": 13,
  "16": 10,
  "15": 8,
  "14": 6,
  "13": 5,
  "12": 4,
  "11": 3,
  "10": 2,
  "9":  1,
  "8": 0
};
let stat_bonuses = {
  "30": 10,
  "29": 9,
  "28": 9,
  "27": 8,
  "26": 8,
  "25": 7,
  "24": 7,
  "23": 6,
  "22": 6,
  "21": 5,
  "20": 5,
  "19": 4,
  "18": 4,
  "17": 3,
  "16": 3,
  "15": 2,
  "14": 2,
  "13": 1,
  "12": 1,
  "11": 0,
  "10": 0,
  "9":  -1,
  "8": -1,
  "7": -2,
  "6": -2,
  "5": -3,
  "4": -3,
  "3": -4,
  "2": -4,
  "1": -5,
  "0": -10
};
let stats = {};

function calc_used_points() {
  let sum = 0;

  // Sum up the total point cost for each of the stat values
  stat_names.forEach(stat => {
    // Save the value of each of the stats
    stats[stat] = String(Number(document.getElementsByName(stat + '-base')[0].value));

    sum += costs[stats[stat]];
  });

  // Subtract the sum of each of the stats from the overall point pool's value
  document.getElementsByName('points')[0].value = point_total - sum;
}

function update_stat(stat) {
  let points = document.getElementsByName('points')[0].value;

  let cost = get_change_cost(stat);

  // If the cost would exceed the number of remaining points, set the value
  // of the input to the previously saved value of the stat
  if (cost > points) {
    document.getElementsByName(stat + '-base')[0].value = stats[stat];
    
    // TODO: pop-up that let's the user know they violated the point-buy system
    create_popup_at_element(stat, 'Not enough points!');
    setTimeout(function() {
      remove_popup_at_element(stat);
    }, 5000);
  }

  calc_used_points();

  update_totals();
}

function get_change_cost(stat) {
  // Get the value the user changed the stat to
  let stat_element = document.getElementsByName(stat + '-base')[0];
  let attempted_val = stat_element.value;

  // If the value is out of bounds, restrict the value to the bounds
  if (attempted_val > 18) {
    stat_element.value = 18;
    attempted_val = stat_element.value;
  }
  if (attempted_val < 8) {
    stat_element.value = 8;
    attempted_val = stat_element.value;
  }

  // Get the cost of increasing to the new value from the old value
  return Number(costs[attempted_val]) - Number(costs[stats[stat]]);
}

function update_totals() {
  stat_names.forEach(stat => {

    add_bonuses(stat);

    document.getElementsByName(stat + '-bonus')[0].value = stat_bonuses[document.getElementsByName(stat + '-total')[0].value];
  });
}

function add_bonuses(stat) {
  let stat_total = document.getElementsByName(stat + '-total')[0];
  stat_total.value = document.getElementsByName(stat + '-base')[0].value;
  // console.log(Number(document.getElementsByName(stat + '-race')[0].value.substring(1)));
  stat_total.value = Number(stat_total.value) + Number(document.getElementsByName(stat + '-race')[0].value.substring(1));
  stat_total.value = Number(stat_total.value) + Number(document.getElementsByName(stat + '-class')[0].value.substring(1));
}

function create_popup_at_element(name, text) {
  remove_popup_at_element(name);

  let div_elem = document.createElement('div');
  div_elem.id = 'popup';
  div_elem.style.position = 'absolute';
  div_elem.style.left = '100%';
  div_elem.style.top = '0%';
  div_elem.style.backgroundColor = '#555';
  div_elem.style.borderRadius = '5px';
  div_elem.style.textAlign = 'center';
  div_elem.style.padding = '5px';
  div_elem.style.zIndex = 1;
  div_elem.style.width = '7em';

  let div_arrow = document.createElement('div');
  div_arrow.style.borderColor = 'transparent #555 transparent transparent';
  div_arrow.style.borderWidth = '8px 8px 8px 0px';
  div_arrow.style.borderStyle = 'solid';
  div_arrow.style.left = '-8px';
  div_arrow.style.position = 'absolute';
  div_elem.appendChild(div_arrow);

  let text_elem = document.createElement('h4');
  text_elem.style.color = '#EEE';
  text_elem.innerHTML = text;
  text_elem.style.margin = '7px';
  div_elem.appendChild(text_elem);
  
  document.getElementsByName(name + '-base')[0].parentElement.appendChild(div_elem);
}

function remove_popup_at_element(name) {
  if (document.getElementById('popup') != undefined) {
    document.getElementById('popup').remove();
  }
}

function init_abilities() {
  $('[data-toggle="tooltip"]').tooltip();

  calc_used_points();
};

