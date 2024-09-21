/* Element Constants */
const agentSelectImg  = document.getElementById('agentSelect_img');
const leftTeam        = document.getElementsByClassName('team')[0];
const rightTeam       = document.getElementsByClassName('team')[1];

/* NodeCG Replicants */
const rpc_gsi_agentSelect_show = nodecg.Replicant('rpc_gsi_agentSelect_show', { defaultValue: false })
const rpc_gsi_agentSelect_data = nodecg.Replicant('rpc_gsi_agentSelect_data', 'ucc-valorant', { defaultValue: {
  "team_0": [],
  "team_1": []
} });
const rpc_ucc_team1_name = nodecg.Replicant('team1_name', 'ucc-main');
const rpc_ucc_team2_name = nodecg.Replicant('team2_name', 'ucc-main');

/* NodeCG Event Listeners */
rpc_gsi_agentSelect_show.on('change', (newValue, oldValue) => {
  if(newValue){
    showAgentSelect();
  } else {
    hideAgentSelect();
  }
});

rpc_ucc_team1_name.on('change', (newValue, oldValue) => {
  leftTeam.getElementsByClassName('team_name')[0].innerText = newValue;
});

rpc_ucc_team2_name.on('change', (newValue, oldValue) => {
  rightTeam.getElementsByClassName('team_name')[0].innerText = newValue;
});

rpc_gsi_agentSelect_data.on('change', (newValue, oldValue) => {
  if (newValue["team_0"].length === 0 && newValue["team_1"].length === 0) {
    leftTeam.getElementsByClassName('player').forEach(player => {
      player.dataset.rosterId = undefined;
      const agentIcon = player.getElementsByClassName('agent_icon')[0];
      agentIcon.src = "../assets/agents/unknown.webp";
      agentIcon.style = "filter: grayscale(100%);";
      player.getElementsByClassName('player_name')[0].innerText = "Undefined Name";
    });
    rightTeam.getElementsByClassName('player').forEach(player => {
      player.dataset.rosterId = undefined;
      const agentIcon = player.getElementsByClassName('agent_icon')[0];
      agentIcon.src = "../assets/agents/unknown.webp";
      agentIcon.style = "filter: grayscale(100%);";
      player.getElementsByClassName('player_name')[0].innerText = "Undefined Name";
    });
  } else {
    for (let player in newValue["team_1"]) {
      const playerGroup = leftTeam.getElementsByClassName('player')[player];
      const playerData = newValue["team_1"][player];

      playerGroup.dataset.rosterId = playerData["rawIndex"];

      const agentIcon = playerGroup.getElementsByClassName('agent_icon')[0];
      if (playerData["character"] === undefined || playerData["character"] === "") {
        agentIcon.src = `../assets/agents/unknown.webp`;
      } else {
        agentIcon.src = `../assets/agents/${playerData["character"]}.webp`;
      }
      agentIcon.style = playerData["locked"] ? "filter: grayscale(0%);" : "filter: grayscale(100%);";
      playerGroup.getElementsByClassName('player_name')[0].innerText = playerData["name"];
    }
    for (let player in newValue["team_0"]) {
      const playerGroup = rightTeam.getElementsByClassName('player')[player];
      const playerData = newValue["team_0"][player];

      playerGroup.dataset.rosterId = playerData["rawIndex"];

      const agentIcon = playerGroup.getElementsByClassName('agent_icon')[0];
      if (playerData["character"] === undefined || playerData["character"] === "") {
        agentIcon.src = `../assets/agents/unknown.webp`;
      } else {
        agentIcon.src = `../assets/agents/${playerData["character"]}.webp`;
      }
      agentIcon.style = playerData["locked"] ? "filter: grayscale(0%);" : "filter: grayscale(100%);";
      playerGroup.getElementsByClassName('player_name')[0].innerText = playerData["name"];
    }
  }
});

/* Functions */
function hideAgentSelect(){
  const leftPlayerDivs = leftTeam.getElementsByClassName('player');
  const rightPlayerDivs = rightTeam.getElementsByClassName('player');
  const teamNames = document.getElementsByClassName('team_name');

  // Different Directions for the Drop Down Animation
  let i = 1;
  for (let player of leftPlayerDivs) {
    setTimeout(() => {
      player.classList.remove('player_visible');
    }, (125 * i++));
  }
  let j = 5;
  for (let player of rightPlayerDivs) {
    setTimeout(() => {
      player.classList.remove('player_visible');
    }, (125 * j--));
  }

  setTimeout(() => {
    document.getElementById('agentSelect_img').style = 'transition: all 400ms ease-in-out;';
  }, 400);

  setTimeout(() => {
    document.getElementById("left_side").style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 0 0 100%);"
    document.getElementById("right_side").style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 100% 0 0);"
    teamNames[0].style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 0 0 100%);"
    teamNames[1].style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 100% 0 0);"
  }, 300);
}

function showAgentSelect(){
  const leftPlayerDivs = leftTeam.getElementsByClassName('player');
  const rightPlayerDivs = rightTeam.getElementsByClassName('player');
  const teamNames = document.getElementsByClassName('team_name');
  document.getElementById("left_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 30%);"
  document.getElementById("right_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 30% 0 0);"
  teamNames[0].style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 0);"
  teamNames[1].style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 0);"

  setTimeout(() => {
    document.getElementById('agentSelect_img').style = 'transition: all 600ms ease-in-out; transform: translateY(0%);';
  }, 500);

  // Different Directions for the Drop Down Animation
  let i = 5;
  for (let player of leftPlayerDivs) {
    setTimeout(() => {
      player.classList.add('player_visible');
    }, (125 * i--));
  }
  let j = 1;
  for (let player of rightPlayerDivs) {
    setTimeout(() => {
      player.classList.add('player_visible');
    }, (125 * j++));
  }
}
