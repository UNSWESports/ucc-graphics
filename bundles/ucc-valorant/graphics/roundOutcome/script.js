/* Element Constants */
const agentSelectImg  = document.getElementById('matchOutcome_img');
const middleThird     = document.getElementById('middle_third');
const team_element    = document.getElementsByClassName('team_name')[0];

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

  team_element.innerText = teamName;

  middleThird.classList.add('visible');

  setTimeout(() => {
    middleThird.classList.remove('visible');
  }, 6000);
})