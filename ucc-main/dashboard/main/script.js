/* Element Constants */
const btn_update = document.querySelector('#updateButton');

const input_overlay = document.querySelector('#layoutInput');

const input_info_text = document.querySelector('#infoTextInput');

const input_title_text = document.querySelector('#eventTitleInput');

const input_subtitle_text = document.querySelector('#eventSecondaryTitleInput');

const input_overlay_switch = document.querySelector('#showOverlay');

/* NodeCG Replicants */
const rpc_ucc_overlay_layout = nodecg.Replicant('overlay_layout', 'ucc-main');

const rpc_ucc_info_text = nodecg.Replicant('info_text', 'ucc-main');
const rpc_ucc_title_text = nodecg.Replicant('title_text', 'ucc-main');
const rpc_ucc_subtitle_text = nodecg.Replicant('subtitle_text', 'ucc-main');

const rpc_ucc_overlay_list = nodecg.Replicant('overlay_list', 'ucc-main', { defaultValue: [] });

const rpc_ucc_overlay_state = nodecg.Replicant('overlay_state', 'ucc-main', { defaultValue: false });

/* NodeCG Event Listeners */
rpc_ucc_overlay_layout.on('change', (newValue, oldValue) => {
    input_overlay.value = newValue;
});

rpc_ucc_overlay_state.on('change', (newValue, oldValue) => {
    input_overlay_switch.value = newValue;
});

rpc_ucc_info_text.on('change', (newValue, oldValue) => {
    input_info_text.value = newValue;
});

rpc_ucc_title_text.on('change', (newValue, oldValue) => {
    input_title_text.value = newValue;
});

rpc_ucc_subtitle_text.on('change', (newValue, oldValue) => {
    input_subtitle_text.value = newValue;
});

rpc_ucc_overlay_list.on('change', (newValue, oldValue) => {
    input_overlay.innerHTML = "";
    for (let x of newValue) {
        let option = document.createElement("option");
        option.value = x[1];
        option.text = x[0];
        input_overlay.add(option);
    }
    input_overlay.value = rpc_ucc_overlay_layout.value;
});

/* NodeCG Updates */
btn_update.onclick = () => {
    rpc_ucc_info_text.value = input_info_text.value;
    rpc_ucc_title_text.value = input_title_text.value;
    rpc_ucc_subtitle_text.value = input_subtitle_text.value;

    rpc_ucc_overlay_layout.value = input_overlay.value;
}

/* Functions */
function updateOverlayState(element) {
    rpc_ucc_overlay_state.value = input_overlay_switch.checked;
}