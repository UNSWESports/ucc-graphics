'use strict';

module.exports = function (nodecg) {
	
	// Production data to be access by graphics and external bundles
	// Team Names
	// Team Scores
	// Game Text (Info Box)
	// Main Title (UNSW Contenders Cup 2xTx)
	// Secondary Title (Valorant Premier)

	const rpc_ucc_overlay_list = nodecg.Replicant('overlay_list', { 
		defaultValue: [], 
		persistent: false
	});

	// Register Overlay Bundle
	nodecg.listenFor('registerOverlay', (data) => {
		if (data in rpc_ucc_overlay_list.value) return;
		rpc_ucc_overlay_list.value.push(data);
	});
};
