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
	const rpc_gsi_scores = nodecg.Replicant('val_scores', {
		defaultValue: { "team_0": 0, "team_1": 0 }
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
		console.log(`VALORANT GSI: ${JSON.stringify(req.body)}`);
		const gameStatsJSON = req.body;
		rpc_ucc_valtest.value = req.body;

		if (!gameStatsJSON.hasOwnProperty("event")) return res.sendStatus(400);

		if (gameStatsJSON["event"] == "scene") {
			// Agent Select
			if (gameStatsJSON["data"] === "CharacterSelectPersistentLevel") {
				console.log("Agent Select Started - Resetting Scoreboard and Roster Data");
				// Reset Scoreboard and Roster Data
				team_scoreboard["team_0"] = [];
				team_scoreboard["team_1"] = [];

				team_roster["team_0"] = [];
				team_roster["team_1"] = [];
				rpc_gsi_agentSelect_data.value = {
					"team_0": [],
					"team_1": []
				};
				rpc_gsi_scores.value = { "team_0": 0, "team_1": 0 };
			}
		}

		if (gameStatsJSON["event"] == "scoreboard") {
			const scoreboardData = JSON.parse(gameStatsJSON["data"]);
			const playerIndex = parseInt(gameStatsJSON["eventIndex"]);

			scoreboardData["character"] = AGENT_MAP[scoreboardData["character"]];
			scoreboardData["name"] = scoreboardData["name"].replace(/#.{3,5}$/g, "");
			scoreboardData["weapon"] = WEAPON_MAP[scoreboardData["weapon"]];
			scoreboardData["ultPoints"] = scoreboardData["ult_points"];
			scoreboardData["ultMax"] = scoreboardData["ult_max"];
			scoreboardData["rawIndex"] = `scoreboard_${playerIndex}`;

			const playerTeam = team_scoreboard[`team_${scoreboardData["team"]}`];

			// Start of Round Credits and Delta Handling
			if (rpc_gsi_roundPhase.value == "shopping") {
				const currentMap = rpc_gsi_creditDeltas.value;

				if (currentMap[scoreboardData["rawIndex"]] === undefined) {
					currentMap[scoreboardData["rawIndex"]] = {"credits": -1, "delta": 0};
				}

				if (!lockMoney) {
					currentMap[scoreboardData["rawIndex"]]["credits"] = scoreboardData["money"];
				}

				currentMap[scoreboardData["rawIndex"]]["delta"] = 
					parseInt(scoreboardData["money"]) 
						- parseInt(currentMap[scoreboardData["rawIndex"]]["credits"]);

				rpc_gsi_creditDeltas.value = currentMap;

				// Update scoreboard replicant
				let isExist = false;
				for (let playerI in playerTeam) {
					if (playerTeam[playerI]["rawIndex"] === scoreboardData["rawIndex"]) {
						playerTeam[playerI] = scoreboardData;
						isExist = true;
						break;
					}
				}

				if (!isExist) {
					playerTeam.push(scoreboardData);
				}
			}

			rpc_gsi_scoreboard.value = team_scoreboard;
		}

		if (gameStatsJSON["event"] == "roster") {
			const rosterData = JSON.parse(gameStatsJSON["data"]);
			const playerIndex = parseInt(gameStatsJSON["eventIndex"]);

			rosterData["character"] = AGENT_MAP[rosterData["character"]];
			rosterData["name"] = rosterData["name"].replace(/#.{3,5}$/g, "");
			rosterData["rawIndex"] = `roster_${playerIndex}`;

			const playerTeam = team_roster[`team_${rosterData["team"]}`];
			let teamIndex = playerTeam.findIndex(p => p["rawIndex"] === `roster_${playerIndex}`);
			if (teamIndex !== -1) {
				playerTeam[teamIndex] = rosterData;
			} else {
				playerTeam.push(rosterData);
			}
			rpc_gsi_agentSelect_data.value = team_roster;
		}

		if (gameStatsJSON["event"] == "round_phase") {
			rpc_gsi_roundPhase.value = gameStatsJSON["data"];

			// Handle locking start of round credits count
			if (rpc_gsi_roundPhase.value == "end") {
				lockMoney = false;
			} else if (rpc_gsi_roundPhase.value == "shopping") {
				setTimeout(() => {
					lockMoney = true;
					// Auto Show Overlay Check
					if (rpc_gsi_overlay_auto.value) {
						rpc_gsi_overlay_state.value = true;
					}
				}, 500);
			} else if (rpc_gsi_roundPhase.value == "combat") {
				if (rpc_gsi_overlay_auto.value) {
					rpc_gsi_overlay_state.value = false;
				}
			} 
		}

		if (gameStatsJSON["event"] == "match_score") {
			const oldScores = rpc_gsi_scores.value;
			const newScores = JSON.parse(gameStatsJSON["data"]);
			newScores["team_0"] = parseInt(newScores["team_0"]);
			newScores["team_1"] = parseInt(newScores["team_1"]);

			let winner;

			if (newScores["team_1"] > oldScores["team_1"]) {
				// Team 1 (Left) Scored
				winner = 1;
			} else if (newScores["team_0"] > oldScores["team_0"]) {
				// Team 0 (Right) Scored
				winner = 0;
			}

			rpc_gsi_scores.value = JSON.parse(gameStatsJSON["data"]);
			nodecg.sendMessage('roundOutcome', {
				"team":	winner
			});
		}

		if (gameStatsJSON["event"] == "round_number") {
			rpc_gsi_roundNo.value = parseInt(gameStatsJSON["data"]);
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
