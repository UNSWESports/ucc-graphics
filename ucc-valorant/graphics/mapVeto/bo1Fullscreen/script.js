/* Element Constants */
const eMapBan1Div = document.getElementById('mapBan1');
const eMapBan2Div = document.getElementById('mapBan2');
const eMapBan3Div = document.getElementById('mapBan3');
const eMapBan4Div = document.getElementById('mapBan4');
const eMapBan5Div = document.getElementById('mapBan5');
const eMapBan6Div = document.getElementById('mapBan6');
const eMapBan7Div = document.getElementById('mapBan7');
const expansionCompensation = document.getElementById('expansionCompensation');

/* NodeCG Replicants */
const replMapBan1 = nodecg.Replicant('mapBan1');
const replMapBan2 = nodecg.Replicant('mapBan2');
const replMapBan3 = nodecg.Replicant('mapBan3');
const replMapBan4 = nodecg.Replicant('mapBan4');
const replMapBan5 = nodecg.Replicant('mapBan5');
const replMapBan6 = nodecg.Replicant('mapBan6');
const replMapBan7 = nodecg.Replicant('mapBan7');

/* NodeCG Event Listeners */
replMapBan1.on('change', (newValue, oldValue) => {
  eMapBan1Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan1Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan1Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan2.on('change', (newValue, oldValue) => {
  eMapBan2Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan2Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan2Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan3.on('change', (newValue, oldValue) => {
  eMapBan3Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan3Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan3Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan4.on('change', (newValue, oldValue) => {
  eMapBan4Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan4Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan4Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan5.on('change', (newValue, oldValue) => {
  eMapBan5Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan5Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan5Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan6.on('change', (newValue, oldValue) => {
  eMapBan6Div.style = `background-image: url('${newValue["imageUrl"]}'); background-repeat: no-repeat; background-position: center; background-size: cover;`;
  eMapBan6Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan6Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

replMapBan7.on('change', (newValue, oldValue) => {
  eMapBan7Div.getElementsByClassName('mapVideo')[0].getElementsByClassName('mapVideoSrc')[0].src = newValue["videoUrl"];
  console.log(newValue["videoUrl"])
  eMapBan7Div.getElementsByClassName('mapVideo')[0].load();
  eMapBan7Div.getElementsByClassName('mapVideo')[0].play();
  eMapBan7Div.getElementsByClassName('mapText')[0].innerText = newValue["name"];
  eMapBan7Div.getElementsByClassName('mapSubtext')[0].innerText = newValue["text"];
});

/* Functions */

const expandMapBan = (mapBanDiv) => {
  const topOffset = mapBanDiv.getBoundingClientRect().top;
  const leftOffset = mapBanDiv.getBoundingClientRect().left;
  const width = mapBanDiv.getBoundingClientRect().width;
  const height = mapBanDiv.getBoundingClientRect().height;

  mapBanDiv.dataset.topOffset = topOffset;
  mapBanDiv.dataset.leftOffset = leftOffset;
  mapBanDiv.dataset.height = height;
  mapBanDiv.dataset.width = width;

  mapBanDiv.getElementsByClassName('mapText')[0].style.fontSize = '1.5em';
  mapBanDiv.getElementsByClassName('mapSubtext')[0].style.fontSize = '1em';

  mapBanDiv.style.top = `${topOffset}px`;
  mapBanDiv.style.left = `${leftOffset}px`;

  setTimeout(() => {
    mapBanDiv.style.position = 'fixed';
    mapBanDiv.style.transition = 'width 1.5s ease-in-out, height 1.5s ease-in-out, top 1.5s ease-in-out, left 1.5s ease-in-out';
    mapBanDiv.style.top = `0px`;
    mapBanDiv.style.left = `0px`;
    mapBanDiv.style.height = '100vh';
    mapBanDiv.style.width = '100vw';
    expansionCompensation.style.width = `${width}px`;
  }, 50)
}

const deflateMapBan = (mapBanDiv) => {
  mapBanDiv.style.top = mapBanDiv.dataset.topOffset + 'px';
  mapBanDiv.style.left = mapBanDiv.dataset.leftOffset + 'px';
  mapBanDiv.style.height = mapBanDiv.dataset.height + 'px';
  mapBanDiv.style.width = mapBanDiv.dataset.width + 'px';

  mapBanDiv.getElementsByClassName('mapText')[0].style.fontSize = '1em';
  mapBanDiv.getElementsByClassName('mapSubtext')[0].style.fontSize = '0.65em';

  setTimeout(() => {
    mapBanDiv.style.position = 'unset';
    mapBanDiv.style.transition = 'width 1.5s ease-in-out, height 1.5s ease-in-out';
    
    expansionCompensation.style.width = `0px`;
  }, 2000)
}