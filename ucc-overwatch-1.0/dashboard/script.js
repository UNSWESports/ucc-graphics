/* Element Constants */
const btn_update = document.querySelector('#updateButton');
const btn_swap_sides = document.querySelector('#swapSidesButton');

const input_blue_players = document.getElementsByName('team1Player');
const input_blue_roles = document.getElementsByName('team1PlayerRole');

const input_red_players = document.getElementsByName('team2Player');
const input_red_roles = document.getElementsByName('team2PlayerRole');

/* NodeCG Replicants */
const rpc_ucc_blue_player_list = nodecg.Replicant(
    'blue_player_list', 
    { defaultValue: Array(6).fill('') }
);
const rpc_ucc_blue_role_list = nodecg.Replicant(
    'blue_role_list', 
    { defaultValue: Array(6).fill('') }
);

const rpc_ucc_red_player_list = nodecg.Replicant(
    'red_player_list', 
    { defaultValue: Array(6).fill('') }
);
const rpc_ucc_red_role_list = nodecg.Replicant(
    'red_role_list', 
    { defaultValue: Array(6).fill('') }
);

/* NodeCG Event Listeners */
rpc_ucc_blue_player_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        input_blue_players[i].value = newValue[i];
    }
});
rpc_ucc_blue_role_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        input_blue_roles[i].value = newValue[i];
    }
});

rpc_ucc_red_role_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        input_red_roles[i].value = newValue[i];
    }
});
rpc_ucc_red_player_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        input_red_players[i].value = newValue[i];
    }
});

/* NodeCG Updates */
btn_update.onclick = () => {
    let bluePlayers = [];
    let blueRoles = [];
    for (let i = 0; i < input_blue_players.length; i++) {
        bluePlayers.push(input_blue_players[i].value);
        blueRoles.push(input_blue_roles[i].value);
    }
    rpc_ucc_blue_player_list.value = bluePlayers;
    rpc_ucc_blue_role_list.value = blueRoles;

    let redPlayers = [];
    let redRoles = [];
    for (let i = 0; i < input_red_players.length; i++) {
        redPlayers.push(input_red_players[i].value);
        redRoles.push(input_red_roles[i].value);
    }
    rpc_ucc_red_player_list.value = redPlayers;
    rpc_ucc_red_role_list.value = redRoles;
}

btn_swap_sides.onclick = () => {
    let tempPlayers = rpc_ucc_blue_player_list.value;
    let tempRoles = rpc_ucc_blue_role_list.value;
    rpc_ucc_blue_player_list.value = rpc_ucc_red_player_list.value;
    rpc_ucc_blue_role_list.value = rpc_ucc_red_role_list.value;

    rpc_ucc_red_player_list.value = tempPlayers;
    rpc_ucc_red_role_list.value = tempRoles;
};

/* Functions */
