/* Element Constants */
const btnUpdate         = document.getElementById('updateButton');
const switchVisibility  = document.getElementById('toggleVisibility');

const map1Selection     = document.getElementById('map1Select');
const map2Selection     = document.getElementById('map2Select');
const map3Selection     = document.getElementById('map3Select');
const map4Selection     = document.getElementById('map4Select');
const map5Selection     = document.getElementById('map5Select');
const map6Selection     = document.getElementById('map6Select');
const map7Selection     = document.getElementById('map7Select');

const map1Text          = document.getElementById('map1Text');
const map2Text          = document.getElementById('map2Text');
const map3Text          = document.getElementById('map3Text');
const map4Text          = document.getElementById('map4Text');
const map5Text          = document.getElementById('map5Text');
const map6Text          = document.getElementById('map6Text');
const map7Text          = document.getElementById('map7Text');

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

/* NodeCG Event Listeners */
replMapsToggle.on('change', (newValue, oldValue) => {
  switchVisibility.checked = newValue;
});

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
});

replMapBan4.on('change', (newValue, oldValue) => {
  map4Selection.value = newValue?.id;
  map4Text.value = newValue?.text;
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
});

/* NodeCG Updates */

/* Event Listeners */
btnInflate.onclick = () => {
  nodecg.sendMessage('inflate');
}

btnDeflate.onclick = () => {
  nodecg.sendMessage('deflate');
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
    "text": map1Text.value
  };

  let replMapBan2Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map2Selection.value]["name"]
  )[0]?.url;
  replMapBan2.value = {
    "name": replMapImagesAsset.value[map2Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map2Selection.value]["url"],
    "videoUrl": replMapBan2Video,
    "id": map2Selection.value,
    "text": map2Text.value
  };

  let replMapBan3Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map3Selection.value]["name"]
  )[0]?.url;
  replMapBan3.value = {
    "name": replMapImagesAsset.value[map3Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map3Selection.value]["url"],
    "videoUrl": replMapBan3Video,
    "id": map3Selection.value,
    "text": map3Text.value
  };

  let replMapBan4Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map4Selection.value]["name"]
  )[0]?.url;
  replMapBan4.value = {
    "name": replMapImagesAsset.value[map4Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map4Selection.value]["url"],
    "videoUrl": replMapBan4Video,
    "id": map4Selection.value,
    "text": map4Text.value
  };

  let replMapBan5Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map5Selection.value]["name"]
  )[0]?.url;
  replMapBan5.value = {
    "name": replMapImagesAsset.value[map5Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map5Selection.value]["url"],
    "videoUrl": replMapBan5Video,
    "id": map5Selection.value,
    "text": map5Text.value
  };

  let replMapBan6Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map6Selection.value]["name"]
  )[0]?.url;
  replMapBan6.value = {
    "name": replMapImagesAsset.value[map6Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map6Selection.value]["url"],
    "videoUrl": replMapBan6Video,
    "id": map6Selection.value,
    "text": map6Text.value
  };

  let replMapBan7Video = replMapVideosAsset.value.filter(
    (asset) => asset["name"] == replMapImagesAsset.value[map7Selection.value]["name"]
  )[0]?.url;
  replMapBan7.value = {
    "name": replMapImagesAsset.value[map7Selection.value]["name"],
    "imageUrl": replMapImagesAsset.value[map7Selection.value]["url"],
    "videoUrl": replMapBan7Video,
    "id": map7Selection.value,
    "text": map7Text.value
  };
};

/* Functions */
function checkboxHandling(chkbox){
  replMapsToggle.value = switchVisibility.checked;
}