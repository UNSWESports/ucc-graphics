/* Element Constants */
const btn_update = document.querySelector('#updateButton');
const btn_swap_sides = document.querySelector('#swapSidesButton');

const input_team1_name = document.querySelector('#team1NameInput');
const input_team1_score = document.querySelector('#team1ScoreInput');

const input_team2_name = document.querySelector('#team2NameInput');
const input_team2_score = document.querySelector('#team2ScoreInput');

/* NodeCG Replicants */
const rpc_arc_team1_name = nodecg.Replicant('team1_name', 'arc-main');
const rpc_arc_team1_score = nodecg.Replicant('team1_score', 'arc-main');

const rpc_arc_team2_name = nodecg.Replicant('team2_name', 'arc-main');
const rpc_arc_team2_score = nodecg.Replicant('team2_score', 'arc-main');

/* NodeCG Event Listeners */
rpc_arc_team1_name.on('change', (newValue, oldValue) => {
    input_team1_name.value = newValue;
});
rpc_arc_team1_score.on('change', (newValue, oldValue) => {
    input_team1_score.value = newValue;
});

rpc_arc_team2_name.on('change', (newValue, oldValue) => {
    input_team2_name.value = newValue;
});
rpc_arc_team2_score.on('change', (newValue, oldValue) => {
    input_team2_score.value = newValue;
});

/* NodeCG Updates */
btn_update.onclick = () => {
    rpc_arc_team1_name.value = input_team1_name.value;
    rpc_arc_team1_score.value = input_team1_score.value;

    rpc_arc_team2_name.value = input_team2_name.value;
    rpc_arc_team2_score.value = input_team2_score.value;
}

btn_swap_sides.onclick = () => {
    // Send a message. Let the layouts listen and do swaps
    // so that any specific games can have their own
    // ways of swapping sides
    nodecg.sendMessage('swap_sides');
};