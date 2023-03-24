/* Element Constants */
const text_team1_name = document.querySelector('#team1Name');
const text_team1_score = document.querySelector('#team1Score');

const text_team2_name = document.querySelector('#team2Name');
const text_team2_score = document.querySelector('#team2Score');

const text_subtitle = document.querySelector('#subtitle');
const text_title = document.querySelector('#title');
const text_info = document.querySelector('#info');

const img_graphic_bg = document.querySelector('#graphic_bg');

const div_overlay = document.querySelector('#overlay');
const div_overlay_btm = document.querySelector('#overlay_bottom');

/* NodeCG Replicants */
const rpc_ucc_info_text = nodecg.Replicant('info_text', 'ucc-main');
const rpc_ucc_title_text = nodecg.Replicant('title_text', 'ucc-main');
const rpc_ucc_subtitle_text = nodecg.Replicant('subtitle_text', 'ucc-main');

const rpc_ucc_team1_name = nodecg.Replicant('team1_name', 'ucc-main');
const rpc_ucc_team1_score = nodecg.Replicant('team1_score', 'ucc-main');

const rpc_ucc_team2_name = nodecg.Replicant('team2_name', 'ucc-main');
const rpc_ucc_team2_score = nodecg.Replicant('team2_score', 'ucc-main');

const rpc_ucc_overlay_state = nodecg.Replicant(
    'overlay_state', 
    'ucc-main',
    { defaultValue: false }
);

/* NodeCG Event Listeners */
rpc_ucc_info_text.on('change', (newValue, oldValue) => {
    text_info.textContent = newValue;
});

rpc_ucc_overlay_state.on('change', (newValue, oldValue) => {
    div_overlay.dataset.state = newValue;
    if (newValue) {
        div_overlay.style.transform = "translateY(0)";
        div_overlay_btm.style.transform = "translateY(0)";
    } else {
        div_overlay.style.transform = "translateY(-100vh)";
        div_overlay_btm.style.transform = "translateY(100vh)";
    }
});

rpc_ucc_title_text.on('change', (newValue, oldValue) => {
    text_title.textContent = newValue;
});

rpc_ucc_subtitle_text.on('change', (newValue, oldValue) => {
    text_subtitle.textContent = newValue;
});

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

nodecg.listenFor('swap_sides', 'ucc-main', () => {
    let swap = img_graphic_bg.dataset.swapsrc;
    img_graphic_bg.dataset.swapsrc = img_graphic_bg.src;
    img_graphic_bg.src = swap;
});

/* NodeCG Updates */
