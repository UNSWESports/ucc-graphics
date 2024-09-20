'use strict';

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const team_scoreboard = {
		"team_0": [],
		"team_1": []
	}

	const AGENT_MAP = {
		"Clay"			: "Raze",
		"Pandemic"	: "Viper",
		"Wraith"		: "Omen",
		"Hunter"		: "Sova",
		"Thorne"		: "Sage",
		"Phoenix"		: "Phoenix",
		"Wushu"			: "Jett",
		"Gumshoe"		: "Cypher",
		"Sarge"			: "Brimstone",
		"Breach"		: "Breach",
		"Vampire"		: "Reyna",
		"Killjoy"		: "Killjoy",
		"Guide"			: "Skye",
		"Stealth"		: "Yoru",
		"Rift"			: "Astra",
		"Grenadier"	: "KAYO",
		"Deadeye"		: "Chamber",
		"Sprinter"	: "Neon",
		"BountyHunter": "Fade",
		"Mage"			: "Harbor",
		"Aggrobot"	: "Gekko",
		"Cable"			: "Deadlock",
		"Sequoia"		: "Iso",
		"Smonk"			: "Clove",
		"Nox"				: "Vyse"
	}

	const WEAPON_MAP = {
		"TX_Hud_Pistol_Classic"				: "Classic",
		"TX_Hud_Pistol_Slim"					: "Shorty",
		"TX_Hud_Pistol_AutoPistol"		: "Frenzy",
		"TX_Hud_Pistol_Luger"					: "Ghost",
		"TX_Hud_Pistol_Sheriff"				: "Sheriff",
		"TX_Hud_Shotguns_Pump"				: "Bucky",
		"TX_Hud_Shotguns_Persuader"		: "Judge",
		"TX_Hud_SMGs_Vector"					: "Stinger",
		"TX_Hud_SMGs_Ninja"						: "Spectre",
		"TX_Hud_Rifles_Burst"					: "Bulldog",
		"TX_Hud_Rifles_DMR"						: "Guardian",
		"TX_Hud_Rifles_Ghost"					: "Phantom",
		"TX_Hud_Rifles_Volcano"				: "Vandal",
		"TX_Hud_Sniper_Bolt"					: "Marshal",
		"TX_Hud_Sniper_Operater"			: "Operator",
		"TX_Hud_Sniper_DoubleSniper"	: "Outlaw",
		"TX_Hud_LMG"									:	"Ares",
		"TX_Hud_HMG"									:	"Odin",
		"knife"												: "Knife"
	};

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
	let lockMoney = false;


	// v1 - Initial implementation using REST API
	// Move to WebSocket later for better continuous updates
	router.post('/api/gameStats', (req, res) => {
		const gameStatsJSON = req.body;
		rpc_ucc_valtest.value = req.body;

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
					}, 500);
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
					console.log(gameMatchInfo[roster]);
				}
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
