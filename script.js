import { items } from "./items.js";
import { dungeons } from "./dungeons.js";

let dungeon_run_pattern_index = 0
let boss_index = 0;
let dungeon_count = 0;
let boss_count = 0;
let wf_count = 0;
let wf_socket_count = 0;
let wf_tert_count = 0;
let wf_socket_tert_count = 0;
let upgrade_chance_percent = 10;

let interval = 1000;

let keep_running = false;

let timer_id = 0;

// Do 5 x Bloodmaul Slag Mines followed by 5 x Shadowmoon Burial Grounds
let dungeon_run_pattern =  [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 ];

let can_socket = [ "Head", "Neck", "Wrist", "Finger" ];

let tertiaries = [
	{ "name": "avoidance", "code": 40 },
	{ "name": "indestructible", "code": 43 },
	{ "name": "leech", "code": 41 },
	{ "name": "speed", "code": 42 }
];

let starter_gear = [
	{
		"slot": "Head",
		"can_socket": true,
		"item": {
			"id": 122248,
			"ilevel": 26,
			"quality": "Heirloom"
		}
	},
	{
		"slot": "Neck",
		"can_socket": true,
		"item": {
			"id": 122667,
			"ilevel": 26,
			"quality": "Heirloom"
		}
	},
	{
		"slot": "Shoulder",
		"item": {
			"id": 122358,
			"ilevel": 26,
			"quality": "Heirloom"
		}
	},
	{
		"slot": "Back",
		"item": {
			"id": 160984,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Chest",
		"item": {
			"id": 122383,
			"ilevel": 26,
			"quality": "Heirloom"
		}
	},
	{
		"slot": "Wrist",
		"can_socket": true,
		"item": {
			"id": 154478,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Gloves",
		"item": {
			"id": 160460,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Waist",
		"item": {
			"id": 154474,
			"ilevel": 33
		}
	},
	{
		"slot": "Legs",
		"item": {
			"id": 160461,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Feet",
		"item": {
			"id": 161091,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Finger 1",
		"can_socket": true,
		"item": {
			"id": 155381,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Finger 2",
		"can_socket": true,
		"item": {
			"id": 161446,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Trinket 1",
		"item": {
			"id": 158556,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Trinket 2",
		"complete": true,
		"item": {
			"id": 178769,
			"ilevel": 33,
			"quality": "Rare"
		}
	},
	{
		"slot": "Main Hand",
		"item": {
			"id": 140773,
			"ilevel": 26,
			"quality": "Heirloom"
		}
	}
];

let gear = [];

function init_gear()
{
	gear = [];

	for(let i=0; i<starter_gear.length; i++)
	{
		gear[i] = Object.assign({}, starter_gear[i]);

		if(gear[i].item.warforged == undefined)
		{
			gear[i].item.warforged = false;
		}
		
		if(gear[i].item.socket == undefined)
		{
			gear[i].item.socket = false;
		}
			
		if(gear[i].item.tertiary == undefined)
		{
			gear[i].item.tertiary = -1;
		}

		if(gear[i].complete == undefined)
		{
			gear[i].complete = false;
		}

		gear[i].item.score = get_item_score(gear[i].item);
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
	let item_score = item.ilevel;

	if(item.tertiary == 0 || item.tertiary == 1)
	{
		item_score += 1;
	}
	else if(item.tertiary == 2 || item.tertiary == 3)
	{
		item_score += 2;
	}

	if(item.socket)
	{
		item_score += 10;
	}

	return item_score;
}

function upgrade_slot(item, slot1, slot2/*optional*/)
{
	let item_score = get_item_score(item);
	let slot = slot1;

	let upgrade_score = item_score - slot1.item.score;

	if(slot2 != undefined)
	{
		let upgrade_score_2 = item_score - slot2.item.score;

		//console.log(item.id + ", 1: " + slot1.item_id + "2:" + slot2.item_id);

		// Check if already equipped and whether to upgrade slot 1 or 2
		if(item.id == slot1.item.id) 
		{
			// Already equipped in slot 1 so can upgrade slot 1
		}
		else if(item.id == slot2.item.id)
		{
			// Already equipped in slot 2 so can upgrade slot 2
			upgrade_score = upgrade_score_2;
			slot = slot2;
		}
		else if(upgrade_score_2 > upgrade_score)
		{
			// Not equipped in either slot and a bigger upgrade for slot 2
			upgrade_score = upgrade_score_2;
			slot = slot2;
		}
	}

	if(slot.complete != true && upgrade_score > 0)
	{
		slot.item = Object.assign({}, item);
		slot.item.score = item_score;

		return true;
	}
	else
		return false;
}

function init_gear_box()
{
	let gear_box = document.getElementById("gear-box");

	for(let i=0; i<gear.length; i++)
	{
		let row = document.createElement("div");
		row.setAttribute("class", "row row-border");
		gear_box.appendChild(row);

		let icon_cell = document.createElement("div");
		icon_cell.setAttribute("id", gear[i].slot + "-icon-cell");
		icon_cell.setAttribute("class", "gear-icon-cell");
		row.appendChild(icon_cell);

		let name_cell = document.createElement("div");
		name_cell.setAttribute("id", gear[i].slot + "-name-cell");
		name_cell.setAttribute("class", "column");
		row.appendChild(name_cell);

		let bonus_cell = document.createElement("span");
		bonus_cell.setAttribute("id", gear[i].slot + "-bonus-cell");
		bonus_cell.setAttribute("class", "bonus-cell");
		row.appendChild(bonus_cell);
	}
}

function update_slots()
{
	for(let i=0; i<gear.length; i++)
	{
		//let gear_slot = slots[i];
		let icon_cell = document.getElementById(gear[i].slot + "-icon-cell");
		let name_cell = document.getElementById(gear[i].slot + "-name-cell");
		let bonus_cell = document.getElementById(gear[i].slot + "-bonus-cell");
		let bonus_text = "";

		// Remove existing icon
		while(icon_cell.hasChildNodes())
			icon_cell.removeChild(icon_cell.lastChild);

		// Remove existing link
		while(name_cell.hasChildNodes())
			name_cell.removeChild(name_cell.lastChild);

		if(gear[i].item.id != 0)
		{
			let item = get_item_by_item_id(gear[i].item.id);
			let wowhead_link = item.wowhead_link, wowhead_bonus = "", wowhead_link_colour = "colour-rare";

			if(gear[i].item.quality == "Heirloom")
			{
				wowhead_link_colour = "colour-heirloom";
			}
			else if(gear[i].item.quality == "Epic")
			{
				wowhead_link_colour = "colour-epic";
			}

			if(gear[i].item.warforged)
			{
				wowhead_bonus += "4746";
				//bonus_text += " [wf]";
				bonus_text += " [warforged]";
			}

			if(gear[i].item.socket)
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "8810";
				//bonus_text += " [sk]";
				bonus_text += " [socket]";
			}

			if(gear[i].item.tertiary != -1)
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += tertiaries[gear[i].item.tertiary].code;

				bonus_text += " [" + tertiaries[gear[i].item.tertiary].name + "]";
			}

			if(wowhead_bonus.length > 0)
			{
				wowhead_link += "?bonus=" + wowhead_bonus;
			}

			wowhead_link += "&ilvl=" + gear[i].item.ilevel;

			// Icon cell
			let anchor = document.createElement("a");
			anchor.setAttribute("href", wowhead_link);
			var img_element = document.createElement("img");
			img_element.setAttribute("src", "https://wow.zamimg.com/images/wow/icons/small/" + item.wowhead_icon + ".jpg");
			img_element.setAttribute("class", "gear-icon");
			anchor.appendChild(img_element);
			icon_cell.appendChild(anchor);

			// Text link
			anchor = document.createElement("a");
			anchor.setAttribute("href", wowhead_link);
			anchor.setAttribute("class", wowhead_link_colour);
			anchor.textContent = item.name;
			name_cell.appendChild(anchor);

			bonus_cell.textContent = bonus_text;
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

	let text = dungeon_count + " dungeon(s), " + boss_count + " boss(es)\n";
	text += "Assumed upgrade chance: " + upgrade_chance_percent + "%\n";
	text += "Warforged: " + wf_count + " (" + wf_percent.toFixed(2) + "%)\n";
	text += "Warforged + socket: " + wf_socket_count + " (" + wf_socket_percent.toFixed(2) + "%)\n";
	text += "Warforged + tertiary: " + wf_tert_count + " (" + wf_tert_percent.toFixed(2) + "%)\n";
	text += "Warforged + socket + tertiary: " + wf_socket_tert_count + " (" + wf_socket_tert_percent.toFixed(2) + "%)";

	document.getElementById("stats-cell").innerText = text;
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
	for(i=0; i<gear.length; i++)
	{
		if(gear[i].complete == false)
		{
			if(gear[i].warforged == false || (gear[i].can_socket == true && gear[i].item.socket == false) ||
				(gear[i].item.tertiary != 2 && gear[i].item.tertiary != 3))
			{
				return false;
			}
			else
			{
				gear[i].complete = true;
			}
		}
	}

	return true;
}

function step()
{
	let dungeon_index = dungeon_run_pattern[dungeon_run_pattern_index];
	let dungeon = dungeons[dungeon_index];
	let boss = dungeon.bosses[boss_index];

	//let upgrade_chance_percent = document.getElementById("upgrade_chance_percent").value;

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
		item.tertiary = rand_int(0, tertiaries.length-1);
	}
	else
	{
		item.tertiary = -1;
	}

	if(item.warforged)
	{
		item.quality = "Epic";
		item.ilevel = 59;
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
	{
		item.quality = "Rare";
		item.ilevel = 33;
	}

	let slot_name = item.slot;
	let slot1 = undefined, slot2 = undefined;
	if((slot_name == "Finger"))
	{
		slot1 = gear.find(slot => slot.slot == "Finger 1");
		slot2 = gear.find(slot => slot.slot == "Finger 2");
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

		slot1 = gear.find(slot => slot.slot == slot_name);
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

		//if(is_fully_warforged())
		if(is_fully_upgraded())
			keep_running = false;
	}

	if(keep_running)
		timer_id = setTimeout(step, interval);
}

document.getElementById("run-btn").addEventListener("click", (e) => {
	run();
});

document.getElementById("resume-btn").addEventListener("click", (e) => {
	resume();
});

document.getElementById("pause-btn").addEventListener("click", (e) => {
	pause();
});

document.getElementById("reset-btn").addEventListener("click", (e) => {
	reset();
});

document.getElementById("faster-btn").addEventListener("click", (e) => {
	faster();
});

document.getElementById("fastest-btn").addEventListener("click", (e) => {
	fastest();
});

document.getElementById("slower-btn").addEventListener("click", (e) => {
	slower();
});

function run()
{
	reset();
	resume();
}

function resume()
{
	clearTimeout(timer_id);

	keep_running = true;
	step();
}

function pause()
{
	clearTimeout(timer_id);

	keep_running = false;
}

function faster()
{
	clearTimeout(timer_id);
	interval = interval / 2;

	if(keep_running == true)
		resume();
}

function fastest()
{
	clearTimeout(timer_id);
	interval = 0;

	if(keep_running == true)
		resume();
}

function slower()
{
	clearTimeout(timer_id);
	interval = interval * 2;
	if(interval == 0)
		interval = 1;

	if(keep_running == true)
		resume();
}

function init_counts()
{
	dungeon_run_pattern_index = 0;
	boss_index = 0;
	dungeon_count = 0;
	boss_count = 0;
	wf_count = 0;
	wf_socket_count = 0;
	wf_tert_count = 0;
	wf_socket_tert_count = 0;
}

function reset()
{
	clearTimeout(timer_id);

	init_counts();
	init_gear();
	update_slots();
	update_stats();
}

window.onload = function onLoad()
{
	init_gear();
	init_gear_box();
	update_slots();
	update_stats();
}
