const ROLE = {
    "tank": "./Role Icons/tank.svg",
    "flex": "./Role Icons/flex.svg",
    "damage": "./Role Icons/damage.svg",
    "support": "./Role Icons/support.svg"
}

/* Element Constants */
const text_team1_name = document.querySelector('#team1Name');
const text_team1_score = document.querySelector('#team1Score');

const text_team2_name = document.querySelector('#team2Name');
const text_team2_score = document.querySelector('#team2Score');

const text_blue_players = document.getElementsByName('team1Player');
const img_blue_roles = document.getElementsByName('team1PlayerRole');

const text_red_players = document.getElementsByName('team2Player');
const img_red_roles = document.getElementsByName('team2PlayerRole');

const div_versus_banner = document.querySelector('#versusBanner');

const div_blue_players = document.getElementsByClassName('player_blue_bg');
const div_red_players = document.getElementsByClassName('player_red_bg');

/* NodeCG Replicants */
const rpc_ucc_team1_name = nodecg.Replicant('team1_name', 'ucc-main');
const rpc_ucc_team1_score = nodecg.Replicant('team1_score', 'ucc-main');

const rpc_ucc_team2_name = nodecg.Replicant('team2_name', 'ucc-main');
const rpc_ucc_team2_score = nodecg.Replicant('team2_score', 'ucc-main');

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
rpc_ucc_team1_name.on('change', (newValue, oldValue) => {
    text_team1_name.textContent = newValue;
});
rpc_ucc_team1_score.on('change', (newValue, oldValue) => {
    text_team1_score.textContent = newValue;
});

rpc_ucc_team2_name.on('change', (newValue, oldValue) => {
    text_team2_name.textContent = newValue;
});
rpc_ucc_team2_score.on('change', (newValue, oldValue) => {
    text_team2_score.textContent = newValue;
});

rpc_ucc_blue_player_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] == "") {
            div_blue_players[i].style.visibility = "hidden";
            continue;
        }
        div_blue_players[i].style.visibility = "visible";
        text_blue_players[i].textContent = newValue[i];
    }
});
rpc_ucc_blue_role_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] == "") {
            img_blue_roles[i].style.visibility = "hidden";
            continue;
        }
        img_blue_roles[i].style.visibility = "visible";
        img_blue_roles[i].src = ROLE[newValue[i]];
    }
});

rpc_ucc_red_role_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] == "") {
            img_red_roles[i].style.visibility = "hidden";
            continue;
        }
        img_red_roles[i].style.visibility = "visible";
        img_red_roles[i].src = ROLE[newValue[i]];
    }
});
rpc_ucc_red_player_list.on('change', (newValue, oldValue) => {
    for (let i = 0; i < newValue.length; i++) {
        if (newValue[i] == "") {
            div_red_players[i].style.visibility = "hidden";
            continue;
        }
        div_red_players[i].style.visibility = "visible";
        text_red_players[i].textContent = newValue[i];
    }
});

/* NodeCG Updates */

/* Internal Updates */
setTimeout(() => {
    div_versus_banner.style.transform = "translateY(0vh)";
}, 750);

let max = Math.max(div_blue_players.length, div_red_players.length);

for (let i = 0; i < max; i++) {
    setTimeout(() => {
        div_blue_players[i].style.transform = "translateX(0vh)";
        div_red_players[i].style.transform = "translateX(0vh)";
    }, 1250 + (200 * i));
}