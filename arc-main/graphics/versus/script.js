/* Element Constants */
const text_team1_name = document.querySelector('#team1Name');
const text_team1_score = document.querySelector('#team1Score');

const text_team2_name = document.querySelector('#team2Name');
const text_team2_score = document.querySelector('#team2Score');

/* NodeCG Replicants */
const rpc_arc_team1_name = nodecg.Replicant('team1_name', 'arc-main');
const rpc_arc_team1_score = nodecg.Replicant('team1_score', 'arc-main');

const rpc_arc_team2_name = nodecg.Replicant('team2_name', 'arc-main');
const rpc_arc_team2_score = nodecg.Replicant('team2_score', 'arc-main');

/* NodeCG Event Listeners */
rpc_arc_team1_name.on('change', (newValue, oldValue) => {
    text_team1_name.textContent = newValue;
});
rpc_arc_team1_score.on('change', (newValue, oldValue) => {
    text_team1_score.textContent = newValue;
});

rpc_arc_team2_name.on('change', (newValue, oldValue) => {
    text_team2_name.textContent = newValue;
});
rpc_arc_team2_score.on('change', (newValue, oldValue) => {
    text_team2_score.textContent = newValue;
});

/* NodeCG Updates */
