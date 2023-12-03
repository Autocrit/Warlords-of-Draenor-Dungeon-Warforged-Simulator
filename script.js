let dungeon_run_pattern_index = 0
let boss_index = 0;
let dungeon_count = 0;
let boss_count = 0;
let wf_count = 0;
let wf_socket_count = 0;
let wf_tert_count = 0;
let wf_socket_tert_count = 0;

let interval = 1000;

let run = false;

let timer_id = 0;

// Do 5 x Bloodmaul Slag Mines followed by 5 x Shadowmoon Burial Grounds
let dungeon_run_pattern =  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ];

let can_socket = [ "Head", "Neck", "Wrist", "Finger" ];

let tertiaries = [ "speed", "leech", "avoidance", "indestructible" ];

let slots = [
	{ "name": "Head", "can_socket": true },
	{ "name": "Neck", "can_socket": true },
	{ "name": "Shoulder" },
	{ "name": "Chest" },
	{ "name": "Waist" },
	{ "name": "Legs" },
	{ "name": "Feet" },
	{ "name": "Wrist", "can_socket": true },
	{ "name": "Gloves" },
	{ "name": "Finger 1", "can_socket": true },
	{ "name": "Finger 2", "can_socket": true },
	{ "name": "Trinket 1" },
	{ "name": "Trinket 2", "ignore": true },
	{ "name": "Back" },
	{ "name": "Main Hand" },
	{ "name": "Off Hand", "ignore": true }
];

const items = [
	{
		"id": 109898,
		"name": "Blackwater Wrap",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest"
	},
	{
		"id": 109885,
		"name": "Bloodfeather Chestwrap",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest"
	},
	{
		"id": 109884,
		"name": "Chestguard of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest"
	},
	{
		"id": 109886,
		"name": "Crystalbinder Chestguard",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest"
	},
	{
		"id": 109897,
		"name": "Leafmender Robes",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest"
	},
	{
		"id": 109862,
		"name": "Blackwater Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves"
	},
	{
		"id": 109849,
		"name": "Bloodfeather Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves"
	},
	{
		"id": 109850,
		"name": "Crystalbinder Gloves",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves"
	},
	{
		"id": 109848,
		"name": "Gauntlets of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves"
	},
	{
		"id": 109851,
		"name": "Leafmender Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves"
	},
	{
		"id": 110040,
		"name": "Crushto's Neck Separator",
		"class": "Weapon",
		"subclass": "Polearms",
		"slot": "Two-Hand"
	},
	{
		"id": 109882,
		"name": "Blackwater Wristguards",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist"
	},
	{
		"id": 109869,
		"name": "Bloodfeather Bracers",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist"
	},
	{
		"id": 109868,
		"name": "Bracers of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist"
	},
	{
		"id": 109870,
		"name": "Crystalbinder Wristguards",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist"
	},
	{
		"id": 109871,
		"name": "Leafmender Wraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist"
	},
	{
		"id": 109823,
		"name": "Blackwater Leggings",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs"
	},
	{
		"id": 109810,
		"name": "Bloodfeather Leggings",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs"
	},
	{
		"id": 109811,
		"name": "Crystalbinder Legwraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs"
	},
	{
		"id": 109812,
		"name": "Leafmender Legwraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs"
	},
	{
		"id": 109809,
		"name": "Legguards of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs"
	},
	{
		"id": 109904,
		"name": "Cloak of Cascading Blades",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109929,
		"name": "Cloak of Steeled Nerves",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109906,
		"name": "Cloak of Violent Harmony",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109905,
		"name": "Deadshot Greatcloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109916,
		"name": "Drape of Swirling Deflection",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109915,
		"name": "Rigid Scale Cloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109918,
		"name": "Soot-Scarred Longcloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109917,
		"name": "Three-Clefthoof Cape",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back"
	},
	{
		"id": 109799,
		"name": "Blackwater Boots",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet"
	},
	{
		"id": 109788,
		"name": "Bloodfeather Treads",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet"
	},
	{
		"id": 109787,
		"name": "Boots of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet"
	},
	{
		"id": 109789,
		"name": "Crystalbinder Sandals",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet"
	},
	{
		"id": 109798,
		"name": "Leafmender Sandals",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet"
	},
	{
		"id": 110015,
		"name": "Toria's Unseeing Eye",
		"class": "Armor",
		"subclass": "Trinkets",
		"slot": "Trinket"
	},
	{
		"id": 109979,
		"name": "Blackwater Helm",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head"
	},
	{
		"id": 109976,
		"name": "Bloodfeather Cowl",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head"
	},
	{
		"id": 109977,
		"name": "Crystalbinder Helm",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head"
	},
	{
		"id": 109975,
		"name": "Hood of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head"
	},
	{
		"id": 109978,
		"name": "Leafmender Hood",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head"
	},
	{
		"id": 109938,
		"name": "Blackwater Spaulders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder"
	},
	{
		"id": 109935,
		"name": "Bloodfeather Spaulders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder"
	},
	{
		"id": 109936,
		"name": "Crystalbinder Shoulderpads",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder"
	},
	{
		"id": 109937,
		"name": "Leafmender Mantle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder"
	},
	{
		"id": 109934,
		"name": "Spaulders of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder"
	},
	{
		"id": 109779,
		"name": "Ancient Draenic Loop",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109783,
		"name": "Band of the Stalwart Stanchion",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109775,
		"name": "Bladebinder Ring",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109761,
		"name": "Bloodthorn Band",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109760,
		"name": "Ced's Chiming Circle",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109759,
		"name": "Ro-Ger's Brown Diamond Seal",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109776,
		"name": "Seal of Resilient Fortitude",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109762,
		"name": "Signet of Radiant Leaves",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109778,
		"name": "Signet of the Glorious Protector",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109777,
		"name": "Unsullied Signet",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger"
	},
	{
		"id": 109969,
		"name": "Choker of Weeping Viscera",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109951,
		"name": "Fireblade Collar",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109965,
		"name": "Fistbreak Choker",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109967,
		"name": "Necklace of Holy Deflection",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109966,
		"name": "Reinforced Bloodsteel Gorget",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109952,
		"name": "Skulltooth Chain",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109950,
		"name": "Stormshot Choker",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109953,
		"name": "Windseal Necklace",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck"
	},
	{
		"id": 109829,
		"name": "Belt of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist"
	},
	{
		"id": 109842,
		"name": "Blackwater Belt",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist"
	},
	{
		"id": 109830,
		"name": "Bloodfeather Girdle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist"
	},
	{
		"id": 109831,
		"name": "Crystalbinder Belt",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist"
	},
	{
		"id": 109832,
		"name": "Leafmender Girdle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist"
	}
];

const dungeons = [
	{
		"name": "Bloodmaul Slag Mines",
		"bosses": [
				{
					"name": "Magmolatus",
					"loot": [ 109898, 109885, 109884, 109886, 109897, 109862, 109849, 109850, 109848, 109851 ]
				},
				{
					"name": "Slave Watcher Crushto",
					"loot": [ 110040, 109882, 109869, 109868, 109870, 109871, 109823, 109810, 109811, 109812, 109809 ]
				},
				{
					"name": "Roltall",
					"loot": [ 109904, 109929, 109906, 109905, 109916, 109915, 109918, 109917, 109799, 109788, 109787, 109789, 109798, 110015 ]
				},
				{
					"name": "Gug'rokk",
					"loot": [109979, 109976, 109977, 109975, 109978, 109938, 109935, 109936, 109937, 109934, 109779, 109783, 109775, 109761, 109760, 109759, 109776, 109762, 109778, 109777 ]
				}
		]
	},
	{
		"name": "Shadowmoon Burial Grounds",
		"bosses": [
			{
				"name": "Sadana Bloodfury",
				"loot": [ 109969, 109951, 109965, 109967, 109966, 109952, 109950, 109953, 109904, 109929, 109906, 109905, 109916, 109915, 109918, 109917 ]
			},
			{
				"name": "Nhallish",
				"loot": [ 109898, 109885, 109884, 109886, 109897, 109882, 109869, 109868, 109870, 109871 ]
			},
			{
				"name": "Bonemaw",
				"loot": [ 109862, 109849, 109850, 109848, 109851, 109829, 109842, 109830, 109831, 109832 ]
			},
			{
				"name": "Ner'zhul",
				"loot": [ 109979, 109976, 109977, 109975, 109978, 109799, 109788, 109787, 109789, 109798, 109779, 109783, 109775, 109761, 109760, 109759, 109776, 109762, 109778, 109777 ]
			}
		]
	}
];

function init_slots()
{
	for(var i=0; i<slots.length; i++)
	{
		let slot = slots[i];

		slot.item_id = 0;
		slot.item_level = 0;
		slot.item_score = 0;
		slot.warforged = false;
		slot.socket = false;
		slot.tertiary = "";

		if(slot.can_socket == undefined || slot.can_socket == false)
			slot.can_socket = false;

		if(slot.ignore == undefined || slot.ignore == false)
			slot.ignore = false;
	}
}

function get_item_by_item_id(id)
{
	// Get items from JSON file
	return items.find(item => item.id == id);
}

function get_item_score(item)
{
	// warforged > socket > tertiary
	let item_score = 0;
	if(item.item_id != 0)
		item_score = 1;

	if(item.tertiary == "avoidance" || item.tertiary == "indestructible")
	{
		//item_score += 1;
	}

	else if(item.tertiary == "speed" || item.tertiary == "leech")
	{
		item_score += 2;
	}

	if(item.socket)
	{
		item_score += 10;
	}

	if(item.warforged)
	{
		item_score += 100;
	}

	return item_score;
}

function upgrade_slot(item, slot1, slot2/*optional*/)
{
	let item_score = get_item_score(item);
	let slot = slot1;

	let upgrade_score = item_score - slot1.item_score;

	if(slot2 != undefined)
	{
		let upgrade_score_2 = item_score - slot2.item_score;

		// Check if already equipped and whether to upgrade slot 1 or 2
		if((item.item_id == slot2.item_id) || (upgrade_score_2 > upgrade_score))
		{
			upgrade_score = upgrade_score_2;
			slot = slot2;
		}
	}

	if(upgrade_score > 0)
	{
		slot.item_id = item.id;
		slot.item_level = item.item_level;
		slot.item_score = item_score;
		slot.warforged = item.warforged;
		slot.tertiary = item.tertiary;
		if(slot.can_socket)
			slot.socket = item.socket;

		return true;
	}
	else
		return false;
}

function update_slots()
{
	let tbody = document.getElementById("table_contents");

	// Clear table
//	while(slots_element.hasChildNodes()) {
//		slots_element.removeChild(slots_element.lastChild);
//	}

	// Init table
	if(tbody.rows.length == 0)
	{
		for(var i=0; i<slots.length; i++)
		{
			var row = tbody.insertRow();
			
			// Slot
			var cell = row.insertCell();
			cell.textContent = slots[i].name;

			// Item link
			row.insertCell();

			// wf, socket, tertiary
			row.insertCell();
			row.insertCell();
			row.insertCell();
		}
	}

	for(var i=0; i<slots.length; i++)
	{
		let slot = slots[i];
		let row = tbody.rows[i];
		let item_cell = row.cells[1];
		let warforged_cell = row.cells[2];
		let socket_cell = row.cells[3];
		let tertiary_cell = row.cells[4];

		while(item_cell.hasChildNodes())
		{
			item_cell.removeChild(item_cell.lastChild);
		}

		if(slot.warforged)
			warforged_cell.textContent = "warforged";
		else
			warforged_cell.textContent = "";

		if(slot.socket)
			socket_cell.textContent = "socket";
		else
			socket_cell.textContent = "";

		tertiary_cell.textContent = slot.tertiary;

		if(slot.item_id != 0)
		{
			let anchor = document.createElement("a");
			let url = "https://www.wowhead.com/item=" + slot.item_id;
			let ilvl = 33, colour = "color-rare";
			if(slot.warforged)
			{
				url = url + "?bonus=4746";
				colour = "color-epic";
				ilvl = 59;
			}

			url += "&ilvl=" + ilvl;
			anchor.setAttribute("href", url);
			anchor.setAttribute("class", colour);

			let item = get_item_by_item_id(slot.item_id);
			anchor.textContent = item.name;

			item_cell.appendChild(anchor);
		}
	}
}

function update_stats()
{
	let wf_percent = 0, wf_socket_percent = 0, wf_tert_percent = 0, wf_socket_tert_percent = 0;
	if(boss_count > 0)
	{
		wf_percent = 100 * wf_count / boss_count;
		wf_socket_percent = 100 * wf_socket_count / boss_count;
		wf_tert_percent = 100 * wf_tert_count / boss_count;
		wf_socket_tert_percent = 100 * wf_socket_tert_count / boss_count;
	}

	let text = dungeon_count + " dungeon(s)\n";
	text += boss_count + " boss(es)\n";
	text += "Warforged: " + wf_percent.toFixed(2) + "%\n";
	text += "Warforged + socket: " + wf_socket_percent.toFixed(2) + "%\n";
	text += "Warforged + tertiary: " + wf_tert_percent.toFixed(2) + "%\n";
	text += "Warforged + socket + tertiary: " + wf_socket_tert_percent.toFixed(2) + "%";

	document.getElementById("count").innerText = text;
}

function rand_int(min, max)
{
	// min and max are inclusive
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1) + min);
}

function roll_dice(chance_percent)
{
	return Math.random() * 100 <= chance_percent;
}

function is_fully_warforged()
{
	for(i=0; i<slots.length; i++)
		if((slots[i].ignore == undefined || slots[i].ignore == false) && slots[i].warforged == false)
			return false;

	return true;
}

function is_fully_upgraded()
{
	for(i=0; i<slots.length; i++)
	{
		if(slots[i].ignore == false && (slots[i].warforged == false ||
			(slots[i].can_socket == true && slots[i].socket == false) ||
			slots[i].tertiary == "" || slots[i].tertiary == "avoidance" || slots[i].tertiary == "indestructible"))
			return false;
	}

	return true;
}

function step()
{
	let dungeon_index = dungeon_run_pattern[dungeon_run_pattern_index];
	let dungeon = dungeons[dungeon_index];
	let boss = dungeon.bosses[boss_index];

	let upgrade_chance_percent = document.getElementById("upgrade_chance_percent").value;

	// Get a random piece = of loot
	let rand_loot_index = rand_int(0, boss.loot.length-1);
	let item_id = boss.loot[rand_loot_index];

	let item = Object.assign({}, get_item_by_item_id(item_id));

	item.warforged = roll_dice(upgrade_chance_percent);
	if(can_socket.includes(item.slot))
	{
		item.socket = roll_dice(upgrade_chance_percent);
	}

	let tertiary = roll_dice(upgrade_chance_percent);
	
	if(tertiary)
	{
		item.tertiary = tertiaries[rand_int(0, tertiaries.length-1)];
	}
	else
		item.tertiary = "";

	if(item.warforged)
	{
		item.item_level = 59;
		wf_count++;

		if(tertiary)
		{
			wf_tert_count++;
		}

		if(item.socket)
		{
			wf_socket_count++;
			if(tertiary)
				wf_socket_tert_count++;
		}
	}
	else
		item.item_level = 33;

	let slot_name = item.slot;
	let slot1 = undefined, slot2 = undefined;
	if((slot_name == "Finger"))
	{
		slot1 = slots.find(slot => slot.name == "Finger 1");
		slot2 = slots.find(slot => slot.name == "Finger 2");
	}
	else
	{
		if(slot_name == "Trinket")
		{
			slot_name = "Trinket 1";
		}
		else if(slot_name == "Two-Hand")
		{
			slot_name = "Main Hand"
		}

		slot1 = slots.find(slot => slot.name == slot_name);
	}

	let upgraded = upgrade_slot(item, slot1, slot2);

	boss_index++;
	boss_count++;
	if(boss_index >= dungeon.bosses.length)
	{
		// Finished this dungeon
		boss_index = 0;
		dungeon_run_pattern_index++;
		dungeon_count++;

		if(dungeon_run_pattern_index >= dungeon_run_pattern.length)
			// Back to the first dungeon
			dungeon_run_pattern_index = 0;
	}

	update_stats();

	if(upgraded)
	{
		update_slots();

		if(is_fully_upgraded())
			run = false;
	}

	if(run)
		timer_id = setTimeout(step, interval);
}

function start()
{
	reset();
	resume();
}

function resume()
{
	clearTimeout(timer_id);

	run = true;
	step();
}

function stop()
{
	clearTimeout(timer_id);

	run = false;
}

function faster()
{
	clearTimeout(timer_id);
	interval = interval / 2;

	if(run == true)
		resume();
}

function fastest()
{
	clearTimeout(timer_id);
	interval = 0;

	if(run == true)
		resume();
}

function slower()
{
	clearTimeout(timer_id);
	interval = interval * 2;

	if(run == true)
		resume();
}

function init_counts()
{
	dungeon_index = 0;
	boss_index = 0;
	dungeon_count = 0;
	boss_count = 0;
	wf_count = 0;
	wf_tert_count = 0;
	wf_socket_tert_count = 0;
}

function reset()
{
	clearTimeout(timer_id);

	init_counts();
	init_slots();
	update_slots();
	update_stats();
}

window.onload = function onLoad()
{
	reset();
}
