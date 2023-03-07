/* Element Constants */
const btn_update = document.querySelector('#updateButton');

const input_overlay = document.querySelector('#layoutInput');

const input_info_text = document.querySelector('#infoTextInput');

/* NodeCG Replicants */
const rpc_ucc_overlay_state = nodecg.Replicant(
    'ucc_main.overlay_state', 
    { defaultValue: false }
);

const rpc_ucc_info_text = nodecg.Replicant('ucc_main.info_text');

/* NodeCG Event Listeners */
rpc_ucc_overlay_state.on('change', (newValue, oldValue) => {
    input_overlay.value = newValue;
});

rpc_ucc_info_text.on('change', (newValue, oldValue) => {
    input_info_text.value = newValue;
});