/* Element Constants */
const btn_update = document.querySelector('#updateButton');
const btn_swap_sides = document.querySelector('#swapSidesButton');

const input_team1_name = document.querySelector('#team1NameInput');
const input_team1_score = document.querySelector('#team1ScoreInput');

const input_team2_name = document.querySelector('#team2NameInput');
const input_team2_score = document.querySelector('#team2ScoreInput');

/* NodeCG Replicants */
const rpc_ucc_team1_name = nodecg.Replicant('ucc_teams.team1_name');
const rpc_ucc_team1_score = nodecg.Replicant('ucc_teams.team1_score');

const rpc_ucc_team2_name = nodecg.Replicant('ucc_teams.team2_name');
const rpc_ucc_team2_score = nodecg.Replicant('ucc_teams.team2_score');

/* NodeCG Event Listeners */
rpc_ucc_team1_name.on('change', (newValue, oldValue) => {
    input_team1_name.value = newValue;
});
rpc_ucc_team1_score.on('change', (newValue, oldValue) => {
    input_team1_score.value = newValue;
});

rpc_ucc_team2_name.on('change', (newValue, oldValue) => {
    input_team2_name.value = newValue;
});
rpc_ucc_team2_score.on('change', (newValue, oldValue) => {
    input_team2_score.value = newValue;
});

/* NodeCG Updates */
btn_update.onclick = () => {
    rpc_ucc_team1_name.value = input_team1_name.value;
    rpc_ucc_team1_score.value = input_team1_score.value;

    rpc_ucc_team2_name.value = input_team2_name.value;
    rpc_ucc_team2_score.value = input_team2_score.value;
}