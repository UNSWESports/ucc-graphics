/* Element Constants */
const left_scoreboard   = document.getElementById('left_scoreboard');
const right_scoreboard  = document.getElementById('right_scoreboard');

/* NodeCG Replicants */
const rpc_gsi_scoreboard = nodecg.Replicant('val_scoreboard');
const rpc_gsi_creditDeltas = nodecg.Replicant('val_creditDeltas');
const rpc_gsi_overlay_state = nodecg.Replicant('rpc_gsi_overlay_state', 'ucc-valorant', { defaultValue: false });

/* NodeCG Event Listeners */
rpc_gsi_overlay_state.on('change', (newValue, oldValue) => {
  left_scoreboard.classList.toggle('visible', newValue);
  right_scoreboard.classList.toggle('visible', newValue);
});

rpc_gsi_scoreboard.on('change', (newValue, oldValue) => {
  for (let i = 0; i < Object.keys(newValue).length; i++) {
    updateSide(newValue, 0);
    updateSide(newValue, 1);
    // updateIndividual(newValue, Object.keys(newValue)[i]);
  }
});

rpc_gsi_creditDeltas.on('change', (newValue, oldValue) => {
  for (const player in newValue) {
    const creditObj = newValue[player];

    let playerGroup = undefined;
    const players = document.getElementsByClassName("player");
    for (let e of players) {
      console.log(e);
      if (e.dataset.rawIndex == player) {
        playerGroup = e;
        break;
      }
    }
    if (playerGroup === undefined) continue;
    playerGroup.getElementsByClassName("delta")[0].style.display = 
      parseInt(creditObj["delta"]) < 0 ? "block" : "none";
    playerGroup.getElementsByClassName("delta")[0].textContent = creditObj["delta"];
    // playerGroup.getElementsByClassName("current")[0].textContent = creditObj["credits"];
  }

  console.log(JSON.stringify(newValue));
});

/* NodeCG Updates */

/* Function */
const updateSide = (data, team) => {
  const teamId = `team_${team}`;
  for (let player in data[teamId]) {
    updateIndividual(data, teamId, player); 
  }
}

const updateIndividual = (data, team, playerIndex) => {
  console.log(team);
  const scoreboardObj = data[team][playerIndex];
  console.log(scoreboardObj);
  const scoreboard_side = team === 'team_1' ? left_scoreboard : right_scoreboard;
  const playerGroup = scoreboard_side.getElementsByClassName("player")[playerIndex];
  playerGroup.dataset.rawIndex = scoreboardObj["rawIndex"];
  playerGroup.getElementsByClassName("agentIcon")[0].src = `../assets/agents/${scoreboardObj["character"]}.webp`;
  playerGroup.getElementsByClassName("name")[0].textContent = scoreboardObj["name"];
  playerGroup.getElementsByClassName("kda")[0].textContent = 
    `${scoreboardObj["kills"]}/${scoreboardObj["deaths"]}/${scoreboardObj["assists"]}`;
  playerGroup.getElementsByClassName("loadout")[0].children[0].src = 
    `../assets/loadout/${scoreboardObj["weapon"]}.webp`;
  playerGroup.getElementsByClassName("current")[0].textContent = scoreboardObj["money"];

  const ultDiamonds = playerGroup.getElementsByClassName("ultimate")[0].children;
  const ultPoints = parseInt(scoreboardObj["ult_points"]);
  const ultMax = parseInt(scoreboardObj["ult_max"]);
  for (let i in ultDiamonds) {
    if (i == 'length') break;

    if (parseInt(i) >= ultMax) {
      console.log(i, ultMax);
      playerGroup.getElementsByClassName("ultimate")[0].children[i].style.display = "none";
    } else {
      playerGroup.getElementsByClassName("ultimate")[0].children[i].style.display = "block";
    }

    if (parseInt(i) >= ultPoints) {
      ultDiamonds[i].style.color = "rgb(100, 100, 100)";
    } else {
      ultDiamonds[i].style.color = "white";
    }
  }
}