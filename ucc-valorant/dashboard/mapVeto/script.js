/* Element Constants */
const btnUpdate         = document.getElementById('updateButton');
const btnTrimReset      = document.getElementById('trimColourReset');
const switchVisibility  = document.getElementById('toggleVisibility');

const map1Div           = document.getElementById('map1');
const map2Div           = document.getElementById('map2');
const map3Div           = document.getElementById('map3');
const map4Div           = document.getElementById('map4');
const map5Div           = document.getElementById('map5');
const map6Div           = document.getElementById('map6');
const map7Div           = document.getElementById('map7');

const map1Selection     = map1Div.getElementsByClassName('mapSelect')[0];
const map2Selection     = map2Div.getElementsByClassName('mapSelect')[0];
const map3Selection     = map3Div.getElementsByClassName('mapSelect')[0];
const map4Selection     = map4Div.getElementsByClassName('mapSelect')[0];
const map5Selection     = map5Div.getElementsByClassName('mapSelect')[0];
const map6Selection     = map6Div.getElementsByClassName('mapSelect')[0];
const map7Selection     = map7Div.getElementsByClassName('mapSelect')[0];

const map1Text          = map1Div.getElementsByClassName('mapSubtext')[0];
const map2Text          = map2Div.getElementsByClassName('mapSubtext')[0];
const map3Text          = map3Div.getElementsByClassName('mapSubtext')[0];
const map4Text          = map4Div.getElementsByClassName('mapSubtext')[0];
const map5Text          = map5Div.getElementsByClassName('mapSubtext')[0];
const map6Text          = map6Div.getElementsByClassName('mapSubtext')[0];
const map7Text          = map7Div.getElementsByClassName('mapSubtext')[0];

const settingColour     = document.getElementById('trimColour');

const btnInflate        = document.getElementById('inflation');
const btnDeflate        = document.getElementById('deflation');

/* NodeCG Replicants */
const replMapImagesAsset = nodecg.Replicant('assets:mapimages');
const replMapVideosAsset = nodecg.Replicant('assets:mapvideos');
const replMapsToggle = nodecg.Replicant('mapsToggle', { defaultValue: false })

const replMapBan1 = nodecg.Replicant('mapBan1');
const replMapBan2 = nodecg.Replicant('mapBan2');
const replMapBan3 = nodecg.Replicant('mapBan3');
const replMapBan4 = nodecg.Replicant('mapBan4');
const replMapBan5 = nodecg.Replicant('mapBan5');
const replMapBan6 = nodecg.Replicant('mapBan6');
const replMapBan7 = nodecg.Replicant('mapBan7');

const replTrimColour = nodecg.Replicant('trimColour', { defaultValue: '#005F5F' });

/* Mapping */

const MAP_MAPPING = {
  1: {
    "replicant": replMapBan1,
    "div": map1Div,
  },
  2: {
    "replicant": replMapBan2,
    "div": map2Div,
  },
  3: {
    "replicant": replMapBan3,
    "div": map3Div,
  },
  4: {
    "replicant": replMapBan4,
    "div": map4Div,
  },
  5: {
    "replicant": replMapBan5,
    "div": map5Div,
  },
  6: {
    "replicant": replMapBan6,
    "div": map6Div,
  },
  7: {
    "replicant": replMapBan7,
    "div": map7Div,
  }
}

/* NodeCG Event Listeners */
// replMapsToggle.on('change', (newValue, oldValue) => {
//   switchVisibility.checked = newValue;
// });

replMapImagesAsset.on('change', (newValue, oldValue) => {
  map1Selection.innerHTML = '';
  map2Selection.innerHTML = '';
  map3Selection.innerHTML = '';
  map4Selection.innerHTML = '';
  map5Selection.innerHTML = '';
  map6Selection.innerHTML = '';
  map7Selection.innerHTML = '';

  for (let i = 0; i < replMapImagesAsset.value.length; i++){
    map1Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map2Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map3Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map4Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map5Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map6Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
    map7Selection.innerHTML += `<option value=${i}>${replMapImagesAsset.value[i]["name"]}</option>`;
  }
});

replMapBan1.on('change', (newValue, oldValue) => {
  map1Selection.value = newValue?.id;
  map1Text.value = newValue?.text;
});

replMapBan2.on('change', (newValue, oldValue) => {
  map2Selection.value = newValue?.id;
  map2Text.value = newValue?.text;
});

replMapBan3.on('change', (newValue, oldValue) => {
  map3Selection.value = newValue?.id;
  map3Text.value = newValue?.text;
  map3Div.getElementsByClassName('mapActiveToggle')[0].checked = newValue?.active;
});

replMapBan4.on('change', (newValue, oldValue) => {
  map4Selection.value = newValue?.id;
  map4Text.value = newValue?.text;
  map4Div.getElementsByClassName('mapActiveToggle')[0].checked = newValue?.active;
});

replMapBan5.on('change', (newValue, oldValue) => {
  map5Selection.value = newValue?.id;
  map5Text.value = newValue?.text;
});

replMapBan6.on('change', (newValue, oldValue) => {
  map6Selection.value = newValue?.id;
  map6Text.value = newValue?.text;
});

replMapBan7.on('change', (newValue, oldValue) => {
  map7Selection.value = newValue?.id;
  map7Text.value = newValue?.text;
  map7Div.getElementsByClassName('mapActiveToggle')[0].checked = newValue?.active;
});

replTrimColour.on('change', (newValue, oldValue) => {
  settingColour.value = newValue;
});

/* NodeCG Updates */

/* Event Listeners */
btnInflate.onclick = () => {
  nodecg.sendMessage('inflate');
}

btnDeflate.onclick = () => {
  nodecg.sendMessage('deflate');
}

btnTrimReset.onclick = () => {
  settingColour.value = '#005F5F';
}

btnUpdate.onclick = () => {
  let replMapBan1Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map1Selection.value]["name"]
  )[0]?.url;
  replMapBan1.value = {
    "name": replMapImagesAsset.value[map1Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map1Selection.value]["url"],
    "videoUrl": replMapBan1Video,
    "id": map1Selection.value,
    "text": map1Text.value,
    "active": map1Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan2Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map2Selection.value]["name"]
  )[0]?.url;
  replMapBan2.value = {
    "name": replMapImagesAsset.value[map2Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map2Selection.value]["url"],
    "videoUrl": replMapBan2Video,
    "id": map2Selection.value,
    "text": map2Text.value,
    "active": map2Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan3Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map3Selection.value]["name"]
  )[0]?.url;
  replMapBan3.value = {
    "name": replMapImagesAsset.value[map3Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map3Selection.value]["url"],
    "videoUrl": replMapBan3Video,
    "id": map3Selection.value,
    "text": map3Text.value,
    "active": map3Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan4Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map4Selection.value]["name"]
  )[0]?.url;
  replMapBan4.value = {
    "name": replMapImagesAsset.value[map4Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map4Selection.value]["url"],
    "videoUrl": replMapBan4Video,
    "id": map4Selection.value,
    "text": map4Text.value,
    "active": map4Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan5Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map5Selection.value]["name"]
  )[0]?.url;
  replMapBan5.value = {
    "name": replMapImagesAsset.value[map5Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map5Selection.value]["url"],
    "videoUrl": replMapBan5Video,
    "id": map5Selection.value,
    "text": map5Text.value,
    "active": map5Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan6Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map6Selection.value]["name"]
  )[0]?.url;
  replMapBan6.value = {
    "name": replMapImagesAsset.value[map6Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map6Selection.value]["url"],
    "videoUrl": replMapBan6Video,
    "id": map6Selection.value,
    "text": map6Text.value,
    "active": map6Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  let replMapBan7Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map7Selection.value]["name"]
  )[0]?.url;
  replMapBan7.value = {
    "name": replMapImagesAsset.value[map7Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map7Selection.value]["url"],
    "videoUrl": replMapBan7Video,
    "id": map7Selection.value,
    "text": map7Text.value,
    "active": map7Div.getElementsByClassName('mapActiveToggle')[0]?.checked ?? false
  };

  replTrimColour.value = settingColour.value;
};

/* Functions */
function checkboxHandling(chkbox){
  replMapsToggle.value = switchVisibility.checked;
}

const handleActiveMap = (mapNo) => {
  for (let [index, element] of Object.entries(MAP_MAPPING)){
    if (index != mapNo){
      const toggleElement = element.div.getElementsByClassName('mapActiveToggle')[0];
      console.log(index, mapNo, toggleElement);
      if (!toggleElement) continue;

      toggleElement.checked = false;
    }
  }
}