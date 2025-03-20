/* Element Constants */
const div_overlays = document.querySelector('#overlays');

/* NodeCG Replicants */
const rpc_ucc_overlay_layout = nodecg.Replicant(
    'overlay_layout', 'ucc-main'
);

/* NodeCG Event Listeners */
rpc_ucc_overlay_layout.on('change', (newValue, oldValue) => {
    div_overlays.innerHTML = "";
    let iframe = document.createElement("iframe");
    iframe.src = `../../../${newValue}`;
    div_overlays.appendChild(iframe);
});

/* NodeCG Updates */
