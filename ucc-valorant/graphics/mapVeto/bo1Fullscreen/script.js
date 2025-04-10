/* Element Constants */
const eMapBan1Div = document.getElementById('mapBan1');
const eMapBan2Div = document.getElementById('mapBan2');
const eMapBan3Div = document.getElementById('mapBan3');
const eMapBan4Div = document.getElementById('mapBan4');
const eMapBan5Div = document.getElementById('mapBan5');
const eMapBan6Div = document.getElementById('mapBan6');
const eMapBan7Div = document.getElementById('mapBan7');
const expansionCompensation = document.getElementById('expansionCompensation');
const eAudioBuild1 = document.getElementById('build1');
const eAudioBuild2 = document.getElementById('build2');

/* NodeCG Replicants */
const replAudioBuild1 = nodecg.Replicant('assets:mapvetobuild1');
const replAudioBuild2 = nodecg.Replicant('assets:mapvetobuild2');
const replMapBan1 = nodecg.Replicant('mapBan1');
const replMapBan2 = nodecg.Replicant('mapBan2');
const replMapBan3 = nodecg.Replicant('mapBan3');
const replMapBan4 = nodecg.Replicant('mapBan4');
const replMapBan5 = nodecg.Replicant('mapBan5');
const replMapBan6 = nodecg.Replicant('mapBan6');
const replMapBan7 = nodecg.Replicant('mapBan7');

/* NodeCG Event Listeners */
replAudioBuild1.on('change', (newValue, oldValue) => {
  eAudioBuild1.src = newValue[0]?.["url"];
  eAudioBuild1.load();
  eAudioBuild1.play();
});

replAudioBuild2.on('change', (newValue, oldValue) => {
  eAudioBuild2.src = newValue[0]?.["url"];
  eAudioBuild2.load();
});

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

nodecg.listenFor('inflate', () => {
  expandMapBan(eMapBan7Div);
});

nodecg.listenFor('deflate', () => {
  deflateMapBan(eMapBan7Div);
});

/* Functions */

const expandMapBan = (mapBanDiv) => {
  const topOffset = mapBanDiv.getBoundingClientRect().top;
  const leftOffset = mapBanDiv.getBoundingClientRect().left;
  const width = mapBanDiv.getBoundingClientRect().width;
  const height = mapBanDiv.getBoundingClientRect().height;

  const computedStyle = window.getComputedStyle(mapBanDiv);
  const divLMargin = parseInt(computedStyle.marginLeft);
  const divRMargin = parseInt(computedStyle.marginRight);

  mapBanDiv.dataset.topOffset = topOffset;
  mapBanDiv.dataset.leftOffset = leftOffset - divLMargin;
  mapBanDiv.dataset.height = height;
  mapBanDiv.dataset.width = width;

  mapBanDiv.style.top = `${topOffset}px`;
  mapBanDiv.style.left = `${leftOffset - divLMargin}px`;

  eAudioBuild2.play();

  setTimeout(() => {
    mapBanDiv.getElementsByClassName('mapVideoContainer')[0].style.filter = 'brightness(1)'
    mapBanDiv.getElementsByClassName('mapText')[0].style.fontSize = '1.5em';
    mapBanDiv.getElementsByClassName('mapSubtext')[0].style.fontSize = '1em';
    mapBanDiv.style.position = 'fixed';
    mapBanDiv.style.top = `0px`;
    mapBanDiv.style.left = -divLMargin +'px';
    mapBanDiv.style.height = '100vh';
    mapBanDiv.style.width = '100vw';
    mapBanDiv.style.borderLeftWidth = '0px';
    mapBanDiv.style.borderBottomWidth = '0px';
    mapBanDiv.style.borderRadius = '0px';
    expansionCompensation.style.width = `${width + divLMargin + divRMargin}px`;

    eAudioBuild1.pause();
    eAudioBuild1.currentTime = 0;
  }, 100)
}

const deflateMapBan = (mapBanDiv) => {
  mapBanDiv.style.top = mapBanDiv.dataset.topOffset + 'px';
  mapBanDiv.style.left = mapBanDiv.dataset.leftOffset + 'px';
  mapBanDiv.style.height = mapBanDiv.dataset.height + 'px';
  mapBanDiv.style.width = mapBanDiv.dataset.width + 'px';
  mapBanDiv.style.borderLeftWidth = '';
  mapBanDiv.style.borderBottomWidth = '';
  mapBanDiv.style.borderRadius = '';

  mapBanDiv.getElementsByClassName('mapVideoContainer')[0].style.filter = ''

  mapBanDiv.getElementsByClassName('mapText')[0].style.fontSize = '1em';
  mapBanDiv.getElementsByClassName('mapSubtext')[0].style.fontSize = '0.65em';

  eAudioBuild1.play();
  eAudioBuild2.pause();
  eAudioBuild2.currentTime = 0;

  setTimeout(() => {
    mapBanDiv.style.position = 'unset';    
    expansionCompensation.style.width = `0px`;
  }, 1500)
}