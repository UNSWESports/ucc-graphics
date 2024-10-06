/* Element Constants */
const agentSelectImg  = document.getElementById('matchOutcome_img');

/* NodeCG Replicants */
const rpc_gsi_agentSelect_show = nodecg.Replicant('rpc_gsi_agentSelect_show', { defaultValue: false })
const rpc_gsi_agentSelect_data = nodecg.Replicant('rpc_gsi_agentSelect_data', 'ucc-valorant', { defaultValue: {
  "team_0": [],
  "team_1": []
} });
const rpc_ucc_team1_name = nodecg.Replicant('team1_name', 'ucc-main');
const rpc_ucc_team2_name = nodecg.Replicant('team2_name', 'ucc-main');

/* NodeCG Event Listeners */
nodecg.listenFor("roundOutcome", (data) => {
  let teamName = undefined;
  // Determine which team won the round
  if (data["team"] === 1) {
    teamName = rpc_ucc_team1_name.value;
  } else if (data["team"] === 0) {
    teamName = rpc_ucc_team2_name.value;
  }

  
})

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
    document.getElementsByClassName('divider')[0].style = "opacity: 0";
    teamNames[0].style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 0 0 100%);"
    teamNames[1].style = "transition: clip-path 600ms ease-in-out; clip-path: inset(0 100% 0 0);"
  }, 300);
}

function showAgentSelect(){
  const leftPlayerDivs = leftTeam.getElementsByClassName('player');
  const rightPlayerDivs = rightTeam.getElementsByClassName('player');
  const teamNames = document.getElementsByClassName('team_name');
  document.getElementsByClassName('divider')[0].style = "opacity: 1";
  document.getElementById("left_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 30%);"
  document.getElementById("right_side").style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 30% 0 0);"
  teamNames[0].style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 0);"
  teamNames[1].style = "transition: clip-path 1s ease-in-out; clip-path: inset(0 0 0 0);"

  setTimeout(() => {
    document.getElementById('agentSelect_img').style = 'transition: all 600ms ease-in-out; transform: translateY(100%);';
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
