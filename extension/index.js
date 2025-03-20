'use strict';

const STARTGG_KEY = process.env.STARTGG_DEV;
const STARTGG_URL = "https://api.start.gg/gql/alpha";
const STARTGG_HEADERS = {
	'Authorization': `Bearer ${STARTGG_KEY}`
};
const axios = require('axios');

module.exports = function (nodecg) {
	
	// Production data to be access by graphics and external bundles
	// Team Names
	// Team Scores
	// Game Text (Info Box)
	// Main Title (UNSW Contenders Cup 2xTx)
	// Secondary Title (Valorant Premier)

	const rpc_ucc_overlay_list 	= nodecg.Replicant('overlay_list', "ucc-main", { 
		defaultValue: [], 
		persistent: false
	});

	const rp_ucc_team1_name 	= nodecg.Replicant('team1_name', 'ucc-main');
	const rp_ucc_team2_name 	= nodecg.Replicant('team2_name', 'ucc-main');
	const rp_ucc_info_text 		= nodecg.Replicant('info_text', 'ucc-main');

	// Register Overlay Bundle
	nodecg.listenFor('registerOverlay', (data) => {
		if (data in rpc_ucc_overlay_list.value) return;
		rpc_ucc_overlay_list.value.push(data);
	});


	// StartGG API-related
	const rp_startgg_tournaments    =   nodecg.Replicant('startgg_tournaments', 'ucc-main', {
		defaultValue: {},
		persistent: false
	});
	const rp_startgg_events         =   nodecg.Replicant('startgg_events', 'ucc-main', {
		defaultValue: {},
		persistent: false
	});
	const rp_startgg_matches        =   nodecg.Replicant('startgg_matchs', 'ucc-main', {
		defaultValue: {},
		persistent: false
	});

	const rp_startgg_tournamentId 	= 	nodecg.Replicant('startgg_tournId', 'ucc-main', {
		defaultValue: -1,
		persistent: false
	});

	const rp_startgg_phaseId 		= 	nodecg.Replicant('startgg_phaseId', 'ucc-main', {
		defaultValue: -1,
		persistent: false
	});


	nodecg.listenFor('forceRefresh', () => {
		tournamentsRefresh(rp_startgg_tournaments)
	})

	nodecg.listenFor('loadMatch', (val) => {
		console.log(val);
		if (!val) return;
		if (val <= 0) return; 
		
		if (!/(?<=preview_)[0-9]*(?=_)/.test(val)) {
			axios.post(STARTGG_URL, {
				"query": `query setLookup {
					set (id:${val}){
						phaseGroup {
							rounds {number, bestOf}
						}, round, fullRoundText, totalGames, slots {
							entrant {name}
						}}}`
			}, {
				headers: STARTGG_HEADERS		
			}).then(res => {
				const setData = res.data.data?.set;

				console.log(setData?.slots);
				rp_ucc_team1_name.value = setData?.slots[0]?.entrant?.name;
				rp_ucc_team2_name.value = setData?.slots[1]?.entrant?.name;

				const mapRoundBestOf = new Map();
				setData?.phaseGroup?.rounds?.forEach(x => {
					mapRoundBestOf.set(
						x.number, 
						x.bestOf
					);
				})

				const setBestOf = mapRoundBestOf.get(setData?.round);
				rp_ucc_info_text.value = `${setData?.fullRoundText} Bo${setBestOf}`;
			});
		} else {
			axios.post(STARTGG_URL, {
				"query": `query phaseGroupLookup { 
					phaseGroup(id:${rp_startgg_phaseId.value}) {
						sets { nodes {
							id, fullRoundText, identifier, slots { 
								id, entrant {
									name 
								}}}}}}`
			}, {
				headers: STARTGG_HEADERS		
			}).then(res => {
				console.log(res);
				let match = res.data.data?.phaseGroup?.sets?.nodes?.find((node) => node.id == val);
				
				rp_ucc_team1_name.value = match?.slots[0]?.entrant?.name;
				rp_ucc_team2_name.value = match?.slots[1]?.entrant?.name;
			});
		}
	})

	rp_startgg_tournamentId.on('change', async (newValue, oldValue) => {
		console.log(newValue);
		axios.post(STARTGG_URL, {
			"query": `query tournamentLookup {
				tournament(id:${newValue}) {
					events {
						id, name, phases {
							id, name, phaseGroups {
								nodes {
									id, displayIdentifier
								}}}}}}`
		}, {
			headers: STARTGG_HEADERS		
		}).then(res => {
			rp_startgg_events.value = res.data.data?.tournament?.events;
		});
	});

	rp_startgg_phaseId.on('change', async (newValue, oldValue) => {
		axios.post(STARTGG_URL, {
			"query": `query phaseGroupLookup { 
				phaseGroup(id:${newValue}) {
					sets { nodes {
						id, fullRoundText, identifier, slots { 
							id, entrant {
								name 
							}}}}}}`
		}, {
			headers: STARTGG_HEADERS		
		}).then(res => {
			rp_startgg_matches.value = res.data.data?.phaseGroup?.sets?.nodes;
		});
	});

	nodecg.on('serverStarted', () => {
		tournamentsRefresh(rp_startgg_tournaments);
	});
};

let tournamentsRefresh = (rp_startgg_tournaments) => {

	// To-Do: Create this api query when account is fully verified

	rp_startgg_tournaments.value = {
		645064: "UNSW Contenders Cup 2024 T1", 
		673832: "UNSW Contenders Cup 2024 T2"
	};
 
	// let currentYearFormatted = `${new Date().getFullYear()}-01-01`;
	// axios.get(CAPI_URL + 'tournaments.json', {
	// 	params: {
	// 		created_after: currentYearFormatted
	// 	},
	// 	headers: CAPI_HEADERS,
	// 	maxBodyLength: Infinity
	// 	})
	// 	.then(res => {
	// 		console.log(res.data)
	// 		let tournamentNames = res.data.data.map(x => [
	// 			x.attributes.name, 
	// 			x.id
	// 		]);
	// 		rpc_challonge.value = tournamentNames;
	// 	})

}