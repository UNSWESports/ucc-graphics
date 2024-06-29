/* Element Constants */
const btnUpdate         = document.getElementById('updateButton');
const switchBo3         = document.getElementById('toggleBo3');
const switchVisibility  = document.getElementById('toggleVisibility');

const map1Selection     = document.getElementById('map1Select');
const map2Selection     = document.getElementById('map2Select');
const map3Selection     = document.getElementById('map3Select');
const map4Selection     = document.getElementById('map4Select');
const map5Selection     = document.getElementById('map5Select');

const map1Text          = document.getElementById('map1Text');
const map2Text          = document.getElementById('map2Text');
const map3Text          = document.getElementById('map3Text');
const map4Text          = document.getElementById('map4Text');
const map5Text          = document.getElementById('map5Text');

const map1Active        = document.getElementById('map1Active');
const map2Active        = document.getElementById('map2Active');
const map3Active        = document.getElementById('map3Active');
const map4Active        = document.getElementById('map4Active');
const map5Active        = document.getElementById('map5Active');

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
replMapsToggle.on('change', (newValue, oldValue) => {
  switchVisibility.checked = newValue;
});

replBo3Toggle.on('change', (newValue, oldValue) => {
  switchBo3.checked = newValue;
});	

replMapsAsset.on('change', (newValue, oldValue) => {
  map1Selection.innerHTML = '';
  map2Selection.innerHTML = '';
  map3Selection.innerHTML = '';
  map4Selection.innerHTML = '';
  map5Selection.innerHTML = '';

  for (let i = 0; i < replMapsAsset.value.length; i++){
    map1Selection.innerHTML += `<option value=${i}>${replMapsAsset.value[i]["name"]}</option>`;
    map2Selection.innerHTML += `<option value=${i}>${replMapsAsset.value[i]["name"]}</option>`;
    map3Selection.innerHTML += `<option value=${i}>${replMapsAsset.value[i]["name"]}</option>`;
    map4Selection.innerHTML += `<option value=${i}>${replMapsAsset.value[i]["name"]}</option>`;
    map5Selection.innerHTML += `<option value=${i}>${replMapsAsset.value[i]["name"]}</option>`;
  }
});

replMap1.on('change', (newValue, oldValue) => {
  map1Selection.value = newValue["id"];
  map1Active.checked = newValue["active"];
  map1Text.value = newValue["text"];
})

replMap2.on('change', (newValue, oldValue) => {
  map2Selection.value = newValue["id"];
  map2Active.checked = newValue["active"];
  map2Text.value = newValue["text"];
})

replMap3.on('change', (newValue, oldValue) => {
  map3Selection.value = newValue["id"];
  map3Active.checked = newValue["active"];
  map3Text.value = newValue["text"];
})

replMap4.on('change', (newValue, oldValue) => {
  map4Selection.value = newValue["id"];
  map4Active.checked = newValue["active"];
  map4Text.value = newValue["text"];
})

replMap5.on('change', (newValue, oldValue) => {
  map5Selection.value = newValue["id"];
  map5Active.checked = newValue["active"];
  map5Text.value = newValue["text"];
})

/* NodeCG Updates */

/* Event Listeners */

updateButton.onclick = () => {
  replMap1.value = {
    "name": replMapsAsset.value[map1Selection.value]["name"],
    "url": replMapsAsset.value[map1Selection.value]["url"],
    "id": map1Selection.value,
    "active": map1Active.checked,
    "text": map1Text.value
  };
  replMap2.value = {
    "name": replMapsAsset.value[map2Selection.value]["name"],
    "url": replMapsAsset.value[map2Selection.value]["url"],
    "id": map2Selection.value,
    "active": map2Active.checked,
    "text": map2Text.value
  };
  replMap3.value = {
    "name": replMapsAsset.value[map3Selection.value]["name"],
    "url": replMapsAsset.value[map3Selection.value]["url"],
    "id": map3Selection.value,
    "active": map3Active.checked,
    "text": map3Text.value
  };
  replMap4.value = {
    "name": replMapsAsset.value[map4Selection.value]["name"],
    "url": replMapsAsset.value[map4Selection.value]["url"],
    "id": map4Selection.value,
    "active": map4Active.checked,
    "text": map4Text.value
  };
  replMap5.value = {
    "name": replMapsAsset.value[map5Selection.value]["name"],
    "url": replMapsAsset.value[map5Selection.value]["url"],
    "id": map5Selection.value,
    "active": map5Active.checked,
    "text": map5Text.value
  };
};

/* Functions */
function checkboxHandling(chkbox){
  replMapsToggle.value = switchVisibility.checked;
}

function bo3Handling(chkbox){
  replBo3Toggle.value = switchBo3.checked;
}

function currentMapHandling(chkbox){
  const activeMaps = document.getElementsByName('activeMap');
  for (let i = 0; i < activeMaps.length; i++){
    if(activeMaps[i] == chkbox) continue;
    else {
      activeMaps[i].checked = false;
    }
  }
}