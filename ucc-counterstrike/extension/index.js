'use strict';

module.exports = function (nodecg) {
	const router = nodecg.Router();

	const rpc_ucc_cs_text = nodecg.Replicant('literal_text', 'ucc-counterstrike');
	
	// router.post('/gsi', (req, res) => {
	// 	if (req.body.hasOwnProperty("map") && req.body["map"]["phase"] == "gameover") {
	// 		let gsi = req.body;
	// 		let players = gsi["allplayers"];
	// 		let stringRep = "";
	// 		Object.values(players).forEach(element => {
	// 			let pStats = element["match_stats"];
	// 			stringRep += `Player: ${element["name"]} KDA: ${pStats["kills"]}/${pStats["deaths"]}/${pStats["assists"]}`;
	// 			stringRep += "<br><br>";
	// 		});
	// 		stringRep += JSON.stringify(gsi);
	// 		rpc_ucc_cs_text.value = stringRep;
	// 	}
	// 	res.status(200)
	// 	   .set('Content-Type', 'text/plain')
	// 	   .send('');
	// });

	router.post('/overwolf', (req, res) => {
		console.log(JSON.stringify(req.body));
		rpc_ucc_cs_text.value = JSON.stringify(req.body);
		res.status(200)
		   .set('Content-Type', 'text/plain')
		   .send('');
	});

	router.options('/overwolf', (req, res) => {
		res.status(200)
		   .header('Access-Control-Allow-Origin', '*')
		   .header('Access-Control-Allow-Methods', 'POST, OPTIONS')
		   .header('Access-Control-Allow-Headers', 'Content-Type')
		   .send();
	});

	nodecg.sendMessageToBundle(
		'registerOverlay', 
		'ucc-main', 
		[
			`Counter Strike ${nodecg.bundleVersion}`,
			`${nodecg.bundleName}/graphics/index.html`
		]
	);


	nodecg.mount(router);
};
