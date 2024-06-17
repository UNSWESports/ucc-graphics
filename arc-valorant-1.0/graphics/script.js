/* Element Constants */
const text_team1_name = document.querySelector('#team1Name');
// const text_team1_score = document.querySelector('#team1Score');

const text_team2_name = document.querySelector('#team2Name');
// const text_team2_score = document.querySelector('#team2Score');

const text_subtitle = document.querySelector('#subtitle');
// const text_title = document.querySelector('#title');
const text_info = document.querySelector('#info');

const img_graphic_bg = document.querySelector('#graphic_bg');

const div_overlay = document.querySelector('#overlay');

/* NodeCG Replicants */
const rpc_arc_info_text = nodecg.Replicant('info_text', 'arc-main');
// const rpc_arc_title_text = nodecg.Replicant('title_text', 'arc-main');
const rpc_arc_subtitle_text = nodecg.Replicant('subtitle_text', 'arc-main');

const rpc_arc_team1_name = nodecg.Replicant('team1_name', 'arc-main');
// const rpc_arc_team1_score = nodecg.Replicant('team1_score', 'arc-main');

const rpc_arc_team2_name = nodecg.Replicant('team2_name', 'arc-main');
// const rpc_arc_team2_score = nodecg.Replicant('team2_score', 'arc-main');

const rpc_arc_overlay_state = nodecg.Replicant(
    'overlay_state', 
    'arc-main',
    { defaultValue: false }
);

/* NodeCG Event Listeners */
rpc_arc_info_text.on('change', (newValue, oldValue) => {
    text_info.textContent = newValue;
});

rpc_arc_overlay_state.on('change', (newValue, oldValue) => {
    div_overlay.dataset.state = newValue;
    if (newValue) div_overlay.style.transform = "translateY(0)";
    else div_overlay.style.transform = "translateY(-100vh)";
});

// rpc_arc_title_text.on('change', (newValue, oldValue) => {
//     text_title.textContent = newValue;
// });

rpc_arc_subtitle_text.on('change', (newValue, oldValue) => {
    text_subtitle.textContent = newValue;
});

rpc_arc_team1_name.on('change', (newValue, oldValue) => {
    text_team1_name.textContent = newValue;
});
// rpc_arc_team1_score.on('change', (newValue, oldValue) => {
//     text_team1_score.textContent = newValue;
// });

rpc_arc_team2_name.on('change', (newValue, oldValue) => {
    text_team2_name.textContent = newValue;
});
// rpc_arc_team2_score.on('change', (newValue, oldValue) => {
//     text_team2_score.textContent = newValue;
// });

nodecg.listenFor('swap_sides', 'arc-main', () => {
    img_graphic_bg.dataset.scalex = parseInt(img_graphic_bg.dataset.scalex) * -1;
    img_graphic_bg.style.transform = `scaleX(${parseInt(img_graphic_bg.dataset.scalex) * 1})`;
});

/* NodeCG Updates */
