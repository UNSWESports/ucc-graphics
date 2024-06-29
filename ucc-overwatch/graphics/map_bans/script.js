/* Element Constants */
const map1Div = document.getElementById('map1');
const map2Div = document.getElementById('map2');
const map3Div = document.getElementById('map3');
const map4Div = document.getElementById('map4');
const map5Div = document.getElementById('map5');

const mapBansImg = document.getElementById('mapbans_img');

/* NodeCG Replicants */
const replMapsAsset = nodecg.Replicant('assets:maps');
const replMapsToggle = nodecg.Replicant('mapsToggle', { defaultValue: false })
const replBo3Toggle = nodecg.Replicant('bo3Toggle');

const replMap1 = nodecg.Replicant('owMap1');
const replMap2 = nodecg.Replicant('owMap2');
const replMap3 = nodecg.Replicant('owMap3');
const replMap4 = nodecg.Replicant('owMap4');
const replMap5 = nodecg.Replicant('owMap5');

/* NodeCG Event Listeners */
replMap1.on('change', (newValue, oldValue) => {
  map1Div.getElementsByClassName('map_img')[0].style = `background-image: url('${newValue["url"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  if (newValue["active"]) {
    map1Div.getElementsByClassName('map_img')[0].classList.add('activeMap');
  } else map1Div.getElementsByClassName('map_img')[0].classList.remove('activeMap');
  map1Div.getElementsByClassName('map_name')[0].innerText = newValue["name"];
  map1Div.getElementsByClassName('map_text')[0].innerText = newValue["text"];
  map1Div.getElementsByClassName('map_text')[0].style.opacity = (newValue["text"] ? 1:0);
})

replMap2.on('change', (newValue, oldValue) => {
  map2Div.getElementsByClassName('map_img')[0].style = `background-image: url('${newValue["url"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  if (newValue["active"]) {
    map2Div.getElementsByClassName('map_img')[0].classList.add('activeMap');
  } else map2Div.getElementsByClassName('map_img')[0].classList.remove('activeMap');
  map2Div.getElementsByClassName('map_name')[0].innerText = newValue["name"];
  map2Div.getElementsByClassName('map_text')[0].innerText = newValue["text"];
  map2Div.getElementsByClassName('map_text')[0].style.opacity = (newValue["text"] ? 1:0);
})

replMap3.on('change', (newValue, oldValue) => {
  map3Div.getElementsByClassName('map_img')[0].style = `background-image: url('${newValue["url"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  if (newValue["active"]) {
    map3Div.getElementsByClassName('map_img')[0].classList.add('activeMap');
  } else map3Div.getElementsByClassName('map_img')[0].classList.remove('activeMap');
  map3Div.getElementsByClassName('map_name')[0].innerText = newValue["name"];
  map3Div.getElementsByClassName('map_text')[0].innerText = newValue["text"];
  map3Div.getElementsByClassName('map_text')[0].style.opacity = (newValue["text"] ? 1:0);
})

replMap4.on('change', (newValue, oldValue) => {
  map4Div.getElementsByClassName('map_img')[0].style = `background-image: url('${newValue["url"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  if (newValue["active"]) {
    map4Div.getElementsByClassName('map_img')[0].classList.add('activeMap');
  } else map4Div.getElementsByClassName('map_img')[0].classList.remove('activeMap');
  map4Div.getElementsByClassName('map_name')[0].innerText = newValue["name"];
  map4Div.getElementsByClassName('map_text')[0].innerText = newValue["text"];
  map4Div.getElementsByClassName('map_text')[0].style.opacity = (newValue["text"] ? 1:0);
})

replMap5.on('change', (newValue, oldValue) => {
  map5Div.getElementsByClassName('map_img')[0].style = `background-image: url('${newValue["url"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  if (newValue["active"]) {
    map5Div.getElementsByClassName('map_img')[0].classList.add('activeMap');
  } else map5Div.getElementsByClassName('map_img')[0].classList.remove('activeMap');
  map5Div.getElementsByClassName('map_name')[0].innerText = newValue["name"];
  map5Div.getElementsByClassName('map_text')[0].innerText = newValue["text"];
  map5Div.getElementsByClassName('map_text')[0].style.opacity = (newValue["text"] ? 1:0);
})

replMapsToggle.on('change', (newValue, oldValue) => {
  if(newValue){
    showMapBans();
  } else {
    hideMapBans();
  }
});

let bo3Status = false;
replBo3Toggle.on('change', (newValue, oldValue) => {
  bo3Status = newValue;
  if(newValue){
    bo3();
  } else {
    bo5();
  }
});

/* Functions */

function hideMapBans(){
  const banDivs = document.getElementsByClassName('ban');
  let i = 1;
  for (let banDiv of banDivs) {
    console.log(parseInt(banDiv.id))
    setTimeout(() => {
      banDiv.classList.remove('ban_visible');
    }, 75 * i++);
  }

  setTimeout(() => {
    document.getElementById('mapbans_img').style = 'transition: all 400ms ease-in-out;';
  }, 600);

  setTimeout(() => {
    document.getElementById("left_side").style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 0 0 100%);"
    document.getElementById("right_side").style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 100% 0 0);"
  }, 500);
}

function showMapBans(){
  const banDivs = document.getElementsByClassName('ban');
  document.getElementById("left_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 35%);"
  document.getElementById("right_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 35% 0 0);"

  setTimeout(() => {
    document.getElementById('mapbans_img').style = 'transition: all 600ms ease-in-out; transform: translateY(0%) scale(0.5);';
  }, 250);

  let i = 1
  for (let banDiv of banDivs) {
    setTimeout(() => {
      banDiv.classList.add('ban_visible');
    }, 650 + (250 * i++));
  }
}


function bo3(){
  for (let side of document.getElementsByClassName('mb_area')) {
    side.style.width = "39.5%";
  }
  document.getElementById("map_bans").style.width = "38.5%";
  map4Div.style.display = "none";
  map5Div.style.display = "none";
}

function bo5(){
  for (let side of document.getElementsByClassName('mb_area')) {
    side.style.width = "";
  }
  document.getElementById("map_bans").style.width = "";
  map4Div.style.display = "";
  map5Div.style.display = "";
}