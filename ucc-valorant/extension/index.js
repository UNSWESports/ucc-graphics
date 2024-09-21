'use strict';
const { AGENT_MAP, WEAPON_MAP } = require('./gameMaps');

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const team_scoreboard = {
		"team_0": [],
		"team_1": []
	}
	const team_roster = {
		"team_0": [],
		"team_1": []
	}
	let lockMoney = false;

	// NodeCG Replicants
	const rpc_ucc_valtest = nodecg.Replicant('rpc_ucc_valtest');
	const rpc_gsi_roundNo = nodecg.Replicant('val_roundNo', { 
		defaultValue: -1
	});
	const rpc_gsi_roundPhase = nodecg.Replicant('val_roundPhase', {
		defaultValue: "unknown"
	});
	const rpc_gsi_scoreboard = nodecg.Replicant('val_scoreboard', {
		defaultValue: team_scoreboard
	});
	const rpc_gsi_creditDeltas = nodecg.Replicant('val_creditDeltas', {
		defaultValue: {
			"scoreboard_0": {"credits": 0, "delta": 0},
			"scoreboard_1": {"credits": 0, "delta": 0},
			"scoreboard_2": {"credits": 0, "delta": 0},
			"scoreboard_3": {"credits": 0, "delta": 0},
			"scoreboard_4": {"credits": 0, "delta": 0},
			"scoreboard_5": {"credits": 0, "delta": 0},
			"scoreboard_6": {"credits": 0, "delta": 0},
			"scoreboard_7": {"credits": 0, "delta": 0},
			"scoreboard_8": {"credits": 0, "delta": 0},
			"scoreboard_9": {"credits": 0, "delta": 0}
		}
	});
	const rpc_gsi_overlay_auto = nodecg.Replicant('rpc_gsi_overlay_auto', 'ucc-valorant', { defaultValue: true });
	const rpc_gsi_overlay_state = nodecg.Replicant('rpc_gsi_overlay_state', 'ucc-valorant', { defaultValue: false });
	const rpc_gsi_agentSelect_data = nodecg.Replicant('rpc_gsi_agentSelect_data', 'ucc-valorant', { defaultValue: {
		"team_0": [],
		"team_1": []
	} });

	// v1 - Initial implementation using REST API
	// Move to WebSocket later for better continuous updates
	router.post('/api/gameStats', (req, res) => {
		const gameStatsJSON = req.body;
		rpc_ucc_valtest.value = req.body;

		if (gameStatsJSON.hasOwnProperty("info")
		 && gameStatsJSON["feature"] == "game_info"
		 && gameStatsJSON["game_info"].hasOwnProperty("scene"))
		{
			// Agent Select
			if (gameStatsJSON["game_info"]["scene"] == "CharacterSelectPersistentLevel") {
				// Reset Scoreboard and Roster Data
				team_scoreboard["team_0"] = [];
				team_scoreboard["team_1"] = [];
				team_roster["team_0"] = [];
				team_roster["team_1"] = [];
				rpc_gsi_agentSelect_data.value = {
					"team_0": [],
					"team_1": []
				};
			}
		}

		if (gameStatsJSON.hasOwnProperty("info") 
		 && gameStatsJSON["feature"] == "match_info") 
		{
			const gameMatchInfo = gameStatsJSON["info"]["match_info"];
			const scoreboardArray = Object.keys(gameMatchInfo).filter(k => k.startsWith("scoreboard_"));
			const rosterArray = Object.keys(gameMatchInfo).filter(k => k.startsWith("roster_"));

			if (gameMatchInfo.hasOwnProperty("round_number")) {
				rpc_gsi_roundNo.value = gameMatchInfo["round_number"];
			} else if (gameMatchInfo.hasOwnProperty("round_phase")) {
				rpc_gsi_roundPhase.value = gameMatchInfo["round_phase"];

				// Handle locking start of round credits count
				if (gameMatchInfo["round_phase"] == "end") {
					lockMoney = false;
				} else if (gameMatchInfo["round_phase"] == "shopping") {
					setTimeout(() => {
						lockMoney = true;
						// Auto Show Overlay Check
						if (rpc_gsi_overlay_auto.value) {
							rpc_gsi_overlay_state.value = true;
						}
					}, 500);
				} else if (gameMatchInfo["round_phase"] == "combat") {
					if (rpc_gsi_overlay_auto.value) {
						rpc_gsi_overlay_state.value = false;
					}
				}
			} else if (scoreboardArray !== undefined && scoreboardArray.length > 0) { 
				for (let scoreboardObj of scoreboardArray) {
					const playerScoreboard = JSON.parse(gameMatchInfo[scoreboardObj]);
					// Update player data
					playerScoreboard["character"] = AGENT_MAP[playerScoreboard["character"]];
					playerScoreboard["name"] = playerScoreboard["name"].replace(/#.{3,5}$/g, "");
					playerScoreboard["weapon"] = WEAPON_MAP[playerScoreboard["weapon"]];
					playerScoreboard["ultPoints"] = playerScoreboard["ult_points"];
					playerScoreboard["ultMax"] = playerScoreboard["ult_max"];
					playerScoreboard["rawIndex"] = scoreboardObj;
					
					const playerTeam = team_scoreboard[`team_${playerScoreboard["team"]}`];
					
					// Start of Round Credits and Delta Handling
					if (rpc_gsi_roundPhase.value == "shopping") {
						const currentMap = rpc_gsi_creditDeltas.value;

						if (currentMap[scoreboardObj] === undefined) {
							currentMap[scoreboardObj] = {"credits": -1, "delta": 0};
						}

						if (!lockMoney) {
							currentMap[scoreboardObj]["credits"] = playerScoreboard["money"];
						}

						currentMap[scoreboardObj]["delta"] = 
							parseInt(playerScoreboard["money"]) 
								- parseInt(currentMap[scoreboardObj]["credits"]);

						rpc_gsi_creditDeltas.value = currentMap;

						// Update scoreboard replicant
						let isExist = false;
						for (let playerI in playerTeam) {
							if (playerTeam[playerI]["rawIndex"] === scoreboardObj) {
								playerTeam[playerI] = playerScoreboard;
								isExist = true;
							}
						}

						if (!isExist) {
							playerTeam.push(playerScoreboard);
						}
					}
				}

				rpc_gsi_scoreboard.value = team_scoreboard;
				console.log(JSON.stringify(team_scoreboard));
			} else if (rosterArray !== undefined && rosterArray.length > 0) {
				// Update roster data
				for (let roster of rosterArray) {
					const playerData = JSON.parse(gameMatchInfo[roster]);
					const playerTeam = team_roster[`team_${playerData["team"]}`];
					playerData["character"] = AGENT_MAP[playerData["character"]];
					playerData['rawIndex'] = roster;
					playerData["name"] = playerData["name"].replace(/#.{3,5}$/g, "");
					playerTeam.push(playerData);
				}
				rpc_gsi_agentSelect_data.value = team_roster;
			}
		}

		res.sendStatus(200);
	});
	
	nodecg.sendMessageToBundle(
		'registerOverlay', 
		'ucc-main', 
		[
			`Valorant ${nodecg.bundleVersion}`,
			`${nodecg.bundleName}/graphics/index.html`
		]
	);

	router.options('/api/gameStats', (req, res) => {
		res.status(200)
		   .header('Access-Control-Allow-Origin', '*')
		   .header('Access-Control-Allow-Methods', 'POST, OPTIONS')
		   .header('Access-Control-Allow-Headers', 'Content-Type')
		   .send();
	});

	nodecg.mount('/ucc-valorant', router);
};
