let dungeon_run_pattern_index = 0
let boss_index = 0;
let dungeon_count = 0;
let boss_count = 0;
let warforged_count = 0;

let interval = 2000;

let run = false;

let timer_id = 0;

// Do 5 x Bloodmaul Slag Mines followed by 5 x Shadowmoon Burial Grounds
let dungeon_run_pattern =  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ];

let slots = [
	{ "name": "Head" },
	{ "name": "Neck" },
	{ "name": "Shoulder" },
	{ "name": "Chest" },
	{ "name": "Waist" },
	{ "name": "Legs" },
	{ "name": "Feet" },
	{ "name": "Wrist" },
	{ "name": "Gloves" },
	{ "name": "Finger 1" },
	{ "name": "Finger 2" },
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
	slots.forEach(slot => {
		slot.item_id = 0;
		slot.warforged = false;
	});
}

function get_item_by_item_id(id)
{
	// Get items from JSON file
	return items.find(item => item.id == id);
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
		}
	}

	for(var i=0; i<slots.length; i++)
	{
		let slot = slots[i];
		let row = tbody.rows[i];
		let item_cell = row.cells[1];

		while(item_cell.hasChildNodes())
		{
			item_cell.removeChild(item_cell.lastChild);
		}

		if(slot.item_id != 0)
		{

			let anchor = document.createElement("a");
			let url = "https://www.wowhead.com/item=" + slot.item_id;
			let ilvl = 33, colour = "color-rare";
			if(slot.warforged)
			{
				url = url + "?bonus=4746";
				colour = "color-epic";
				ilvl = 59
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

function update_count()
{
	let warforged_percent = 0;
	if(boss_count > 0)
		warforged_percent = 100 * warforged_count / boss_count;
	
	let text = "";
	text += dungeon_count + " dungeon(s), "
	text += boss_count + " boss(es), "
	text += warforged_count + " warforged items (";
	text += warforged_percent.toFixed(1) + "%)"

	document.getElementById("count").innerText = text;
}

function rand_int(min, max)
{
	// min and max are inclusive
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1) + min);
}

function roll_dice(chance_percent) {
	return Math.random() * 100 <= chance_percent;
}

function is_full_warforged()
{
	for(i=0; i<slots.length; i++)
		if((slots[i].ignore == undefined || slots[i].ignore == false) && slots[i].warforged == false)
			return false;

	return true;
}

function step()
{
	let dungeon_index = dungeon_run_pattern[dungeon_run_pattern_index];
	let dungeon = dungeons[dungeon_index];
	let boss = dungeon.bosses[boss_index];

	let warforged_chance_percent = document.getElementById("warforged_chance_percent").value;

	// Get a random piece = of loot
	let rand_loot_index = rand_int(0, boss.loot.length-1);
	let item_id = boss.loot[rand_loot_index];

	let item = get_item_by_item_id(item_id);

	let warforged = roll_dice(warforged_chance_percent);
	if(warforged)
		warforged_count++;

	//console.log("Loot: " + item_id + ", " + item.name + ", " + warforged)

	let slot_name = item.slot;
	if(slot_name == "Trinket")
		slot_name = "Trinket 1";
	else if(slot_name == "Two-Hand")
		slot_name = "Main Hand"
	else if(slot_name == "Finger")
	{
		// Rings are unique-equipped
	
		// Default to Finger 1
		slot_name = "Finger 1";

		let finger1 = slots.find(slot => slot.name == "Finger 1");

		if((finger1.item_id != 0 && finger1.item_id != item_id) ||
			finger1.warforged == true)
		{
			// If Finger 1 is not empty and the item isn't already equipped in Finger 1
			// or Finger 1 is warforged
			slot_name = "Finger 2";
		}
	}

	// Check if its an upgrade
	let slot = slots.find(slot => slot.name == slot_name);
	if(slot.item_id == 0 || (slot.warforged == false && warforged == true))
	{
		slot.item_id = item_id;
		slot.warforged = warforged;
	}

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

	update_slots();
	update_count();

	if(is_full_warforged())
		run = false;

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
	warforged_count = 0;
}

function reset()
{
	clearTimeout(timer_id);

	init_counts();
	init_slots();
	update_slots();
	update_count();
}

window.onload = function onLoad()
{
	reset();
}
