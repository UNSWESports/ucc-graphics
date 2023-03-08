/* Element Constants */
const btn_update = document.querySelector('#updateButton');

const input_overlay = document.querySelector('#layoutInput');

const input_info_text = document.querySelector('#infoTextInput');

const input_title_text = document.querySelector('#eventTitleInput');

const input_subtitle_text = document.querySelector('#eventSecondaryTitleInput');

/* NodeCG Replicants */
const rpc_ucc_overlay_state = nodecg.Replicant(
    'ucc_main.overlay_state', 
    { defaultValue: false }
);

const rpc_ucc_info_text = nodecg.Replicant('ucc_main.info_text');
const rpc_ucc_title_text = nodecg.Replicant('ucc_main.title_text');
const rpc_ucc_subtitle_text = nodecg.Replicant('ucc_main.subtitle_text');

/* NodeCG Event Listeners */
rpc_ucc_overlay_state.on('change', (newValue, oldValue) => {
    input_overlay.value = newValue;
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

/* NodeCG Updates */
btn_update.onclick = () => {
    rpc_ucc_info_text.value = input_info_text.value;
    rpc_ucc_title_text.value = input_title_text.value;
    rpc_ucc_subtitle_text.value = input_subtitle_text.value;

    rpc_ucc_overlay_state.value = input_overlay.value;
}