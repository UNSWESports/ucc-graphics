/* Element Constants */
const btn_reload                =   document.querySelector('#reloadButton');
const btn_loadMatch             =   document.querySelector('#loadMatchButton');

const input_tournaments         =   document.querySelector('#inputTournament');
const input_events              =   document.querySelector('#inputEvent');
const input_phases              =   document.querySelector('#inputPhase');
const input_matches             =   document.querySelector('#inputMatch');

/* NodeCG Replicants */
const rp_startgg_tournaments    =   nodecg.Replicant('startgg_tournaments', 'ucc-main');
const rp_startgg_events         =   nodecg.Replicant('startgg_events', 'ucc-main');
const rp_startgg_matches        =   nodecg.Replicant('startgg_matchs', 'ucc-main');

const rp_startgg_tournamentId   =   nodecg.Replicant('startgg_tournId', 'ucc-main');
const rp_startgg_phaseId        =   nodecg.Replicant('startgg_phaseId', 'ucc-main');

/* NodeCG Event Listeners */
rp_startgg_tournamentId.on('change', (newValue, oldValue) => {
    input_events.value          =   "";
    input_phases.value          =   "";
    input_matches.value         =   "";
});

rp_startgg_phaseId.on('change', (newValue, oldValue) => {
    input_matches.value         =   "";
});

rp_startgg_tournaments.on('change', (newValue, oldValue) => {
    const emptyOption = document.createElement("option");
    emptyOption.value = -1;
    emptyOption.text = " ";

    input_tournaments.innerHTML = ""
    input_tournaments.add(emptyOption);
    for (let x in newValue) {
        let option = document.createElement("option");
        option.value = x;
        option.text = newValue[x];
        input_tournaments.add(option);
    }
});

const eventPhaseMap = new Map();

rp_startgg_events.on('change', (newValue, oldValue) => {
    const emptyOption = document.createElement("option");
    emptyOption.value = -1;
    emptyOption.text = " ";

    input_events.innerHTML = "";
    input_events.add(emptyOption);
    for (let x of newValue) {
        let option = document.createElement("option");
        option.value = x.id;
        option.text = x.name;
        eventPhaseMap.set(x.id, x.phases);
        console.log(eventPhaseMap);
        input_events.add(option);
    }
    input_events.value = "";
});

rp_startgg_matches.on('change', (newValue, oldValue) => {
    const emptyOption = document.createElement("option");
    emptyOption.value = -1;
    emptyOption.text = " ";

    input_matches.innerHTML = "";
    input_matches.add(emptyOption);
    console.log(newValue);
    for (let x of newValue) {
        let option = document.createElement("option");
        option.value = x.id;
        option.text = `${x.fullRoundText} - ${x.slots[0]?.entrant?.name} v ${x.slots[1]?.entrant?.name}`;
        input_matches.add(option);
    }
    input_matches.value = "";
});

input_tournaments.onchange = () => {
    rp_startgg_tournamentId.value = input_tournaments.value;
}

input_events.onchange = () => {
    const emptyOption = document.createElement("option");
    emptyOption.value = -1;
    emptyOption.text = " ";

    input_phases.innerHTML = "";
    input_phases.add(emptyOption);
    eventPhaseMap.get(parseInt(input_events.value))
        .forEach(x => {
            x.phaseGroups?.nodes?.forEach(y => {
                let option = document.createElement("option");
                option.value = y.id;
                option.text = `${x.name}: ${y.displayIdentifier}`;
                input_phases.add(option);
            });
        });
    input_phases.value = "";
}

input_phases.onchange = () => {
    rp_startgg_phaseId.value = input_phases.value;
}

// input_match_id.onchange = () => {
//     rpc_ucc_tourney_id.input_match_id.value;
// }

/* NodeCG Updates */

btn_reload.onclick = () => {
    nodecg.sendMessage("forceRefresh");
}

btn_loadMatch.onclick = () => {
    nodecg.sendMessage("loadMatch", input_matches.value);
}

// btn_update.onclick = () => {
//     rpc_ucc_info_text.value = input_info_text.value;
//     rpc_ucc_title_text.value = input_title_text.value;
//     rpc_ucc_subtitle_text.value = input_subtitle_text.value;

//     rpc_ucc_overlay_layout.value = input_overlay.value;
// }

/* Functions */
// function updateOverlayState(element) {
//     rpc_ucc_overlay_state.value = input_overlay_switch.checked;
// }