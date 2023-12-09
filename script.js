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

let tertiaries = [ "avoidance", "indestructible", "leech", "speed" ];
/*
let tertiaries2 = [
	{
		"name": "avoidance",
		"wowhead_code":
	},
	{
		"name": "indestructible"
		"wowhead_code":
	},
	{
		"name": "leech"
		"wowhead_code":
	},
	{
		"name": "speed"
		"wowhead_code":
	}
];
*/
let starter_gear_set = [
	{
		"slot": "Head",
		"item": {
			"id": 122248,
			"ilevel": 26
		}
	},
	{
		"slot": "Neck",
		"item": {
			"id": 122667,
			"ilevel": 26
		}
	},
	{
		"slot": "Shoulder",
		"item": {
			"id": 122358,
			"ilevel": 26
		}
	},
	{
		"slot": "Back",
		"item": {
			"id": 160984,
			"ilevel": 33
		}
	},
	{
		"slot": "Chest",
		"item": {
			"id": 122383,
			"ilevel": 26
		}
	},
	{
		"slot": "Wrist",
		"item": {
			"id": 154478,
			"ilevel": 33
		}
	},
	{
		"slot": "Gloves",
		"item": {
			"id": 160460,
			"ilevel": 33
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
			"ilevel": 33
		}
	},
	{
		"slot": "Feet",
		"item": {
			"id": 161091,
			"ilevel": 33
		}
	},
	{
		"slot": "Finger 1",
		"item": {
			"id": 155381,
			"ilevel": 33
		}
	},
	{
		"slot": "Finger 2",
		"item": {
			"id": 161446,
			"ilevel": 33
		}
	},
	{
		"slot": "Trinket 1",
		"item": {
			"id": 158556,
			"ilevel": 33
		}
	},
	{
		"slot": "Trinket 2",
		"item": {
			"id": 178769,
			"ilevel": 33
		}
	},
	{
		"slot": "Main Hand",
		"item": {
			"id": 140773,
			"ilevel": 26
		}
	}
];

let slots = [
	{ "name": "Head", "can_socket": true },
	{ "name": "Neck", "can_socket": true },
	{ "name": "Shoulder" },
	{ "name": "Back" },
	{ "name": "Chest" },
	{ "name": "Wrist", "can_socket": true },
	{ "name": "Gloves" },
	{ "name": "Waist" },
	{ "name": "Legs" },
	{ "name": "Feet" },
	{ "name": "Finger 1", "can_socket": true },
	{ "name": "Finger 2", "can_socket": true },
	{ "name": "Trinket 1" },
	{ "name": "Trinket 2", "ignore": true },
	{ "name": "Main Hand" }/*,
	{ "name": "Off Hand", "ignore": true }*/
];

const items = [
	{
		"id": 122248,
		"name": "Stained Shadowcraft Cap",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Heirloom",
		"wowhead_link": "https://www.wowhead.com/item=122248/stained-shadowcraft-cap"
	},
	{
		"id": 122667,
		"name": "Eternal Emberfury Talisman",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Heirloom",
		"wowhead_link": "https://www.wowhead.com/item=122667/eternal-emberfury-talisman"
	},
	{
		"id": 122358,
		"name": "Stained Shadowcraft Spaulders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Heirloom",
		"wowhead_link": "https://www.wowhead.com/item=122358/stained-shadowcraft-spaulders"
	},
	{
		"id": 160984,
		"name": "Sauroscale Cloak of Adaptation",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=160984/sauroscale-cloak-of-adaptation"
	},
	{
		"id": 122383,
		"name": "Stained Shadowcraft Tunic",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Heirloom",
		"wowhead_link": "https://www.wowhead.com/item=122383/stained-shadowcraft-tunic"
	},
	{
		"id": 154478,
		"name": "Ranja-Hide Bracers",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=154478/ranja-hide-bracers"
	},
	{
		"id": 160460,
		"name": "Thick Sauroskin Gloves",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Hands",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=160460/thick-sauroskin-gloves"
	},
	{
		"id": 154474,
		"name": "Sythian Swiftbelt",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=154474/sythian-swiftbelt"
	},
	{
		"id": 160461,
		"name": "Thick Sauroskin Pants",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=160461/thick-sauroskin-pants"
	},
	{
		"id": 161091,
		"name": "Swift-Talon Striders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=161091/swift-talon-striders"
	},
	{
		"id": 155381,
		"name": "Cutwater-Captain's Sapphire Ring",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=155381/cutwater-captains-sapphire-ring"
	},
	{
		"id": 161446,
		"name": "Blistering Seawater Seal",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=161446/blistering-seawater-seal"
	},
	{
		"id": 158556,
		"name": "Siren's Tongue",
		"class": "Armor",
		"subclass": "Trinkets",
		"slot": "Trinket",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=158556/sirens-tongue"
	},
	{
		"id": 178769,
		"name": "Infinitely Divisible Ooze",
		"class": "Armor",
		"subclass": "Trinkets",
		"slot": "Trinket",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=178769/infinitely-divisible-ooze"
	},
	{
		"id": 140773,
		"name": "Eagletalon Spear",
		"class": "Weapon",
		"subclass": "Polearms",
		"slot": "Two-Hand",
		"quality": "Heirloom",
		"wowhead_link": "https://www.wowhead.com/item=140773/eagletalon-spear"
	},
	{
		"id": 109898,
		"name": "Blackwater Wrap",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109898/blackwater-wrap"
	},
	{
		"id": 109885,
		"name": "Bloodfeather Chestwrap",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109885/bloodfeather-chestwrap"
	},
	{
		"id": 109884,
		"name": "Chestguard of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109884/chestguard-of-burning-focus"
	},
	{
		"id": 109886,
		"name": "Crystalbinder Chestguard",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109886/crystalbinder-chestguard"
	},
	{
		"id": 109897,
		"name": "Leafmender Robes",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Chest",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109897/leafmender-robes"
	},
	{
		"id": 109862,
		"name": "Blackwater Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109862/blackwater-grips"
	},
	{
		"id": 109849,
		"name": "Bloodfeather Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109849/bloodfeather-grips"
	},
	{
		"id": 109850,
		"name": "Crystalbinder Gloves",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109850/crystalbinder-gloves"
	},
	{
		"id": 109848,
		"name": "Gauntlets of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109848/gauntlets-of-burning-focus"
	},
	{
		"id": 109851,
		"name": "Leafmender Grips",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Gloves",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109851/leafmender-grips"
	},
	{
		"id": 110040,
		"name": "Crushto's Neck Separator",
		"class": "Weapon",
		"subclass": "Polearms",
		"slot": "Two-Hand",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=110040/crushtos-neck-separator"
	},
	{
		"id": 109882,
		"name": "Blackwater Wristguards",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109882/blackwater-wristguards"
	},
	{
		"id": 109869,
		"name": "Bloodfeather Bracers",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109869/bloodfeather-bracers"
	},
	{
		"id": 109868,
		"name": "Bracers of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109868/bracers-of-burning-focus"
	},
	{
		"id": 109870,
		"name": "Crystalbinder Wristguards",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109870/crystalbinder-wristguards"
	},
	{
		"id": 109871,
		"name": "Leafmender Wraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Wrist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109871/leafmender-wraps"
	},
	{
		"id": 109823,
		"name": "Blackwater Leggings",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109823/blackwater-leggings"
	},
	{
		"id": 109810,
		"name": "Bloodfeather Leggings",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109810/bloodfeather-leggings"
	},
	{
		"id": 109811,
		"name": "Crystalbinder Legwraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109811/crystalbinder-legwraps"
	},
	{
		"id": 109812,
		"name": "Leafmender Legwraps",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109812/leafmender-legwraps"
	},
	{
		"id": 109809,
		"name": "Legguards of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Legs",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109809/legguards-of-burning-focus"
	},
	{
		"id": 109904,
		"name": "Cloak of Cascading Blades",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109904/cloak-of-cascading-blades"
	},
	{
		"id": 109929,
		"name": "Cloak of Steeled Nerves",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109929/cloak-of-steeled-nerves"
	},
	{
		"id": 109906,
		"name": "Cloak of Violent Harmony",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109906/cloak-of-violent-harmony"
	},
	{
		"id": 109905,
		"name": "Deadshot Greatcloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109905/deadshot-greatcloak"
	},
	{
		"id": 109916,
		"name": "Drape of Swirling Deflection",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109916/drape-of-swirling-deflection"
	},
	{
		"id": 109915,
		"name": "Rigid Scale Cloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109915/rigid-scale-cloak"
	},
	{
		"id": 109918,
		"name": "Soot-Scarred Longcloak",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109918/soot-scarred-longcloak"
	},
	{
		"id": 109917,
		"name": "Three-Clefthoof Cape",
		"class": "Armor",
		"subclass": "Cloak",
		"slot": "Back",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109917/three-clefthoof-cape"
	},
	{
		"id": 109799,
		"name": "Blackwater Boots",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109799/blackwater-boots"
	},
	{
		"id": 109788,
		"name": "Bloodfeather Treads",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109788/bloodfeather-treads"
	},
	{
		"id": 109787,
		"name": "Boots of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109787/boots-of-burning-focus"
	},
	{
		"id": 109789,
		"name": "Crystalbinder Sandals",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109789/crystalbinder-sandals"
	},
	{
		"id": 109798,
		"name": "Leafmender Sandals",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Feet",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109798/leafmender-sandals"
	},
	{
		"id": 110015,
		"name": "Toria's Unseeing Eye",
		"class": "Armor",
		"subclass": "Trinkets",
		"slot": "Trinket",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=110015/torias-unseeing-eye"
	},
	{
		"id": 109979,
		"name": "Blackwater Helm",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109979/blackwater-helm"
	},
	{
		"id": 109976,
		"name": "Bloodfeather Cowl",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109976/bloodfeather-cowl"
	},
	{
		"id": 109977,
		"name": "Crystalbinder Helm",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109977/crystalbinder-helm"
	},
	{
		"id": 109975,
		"name": "Hood of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109975/hood-of-burning-focus"
	},
	{
		"id": 109978,
		"name": "Leafmender Hood",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Head",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109978/leafmender-hood"
	},
	{
		"id": 109938,
		"name": "Blackwater Spaulders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109938/blackwater-spaulders"
	},
	{
		"id": 109935,
		"name": "Bloodfeather Spaulders",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109935/bloodfeather-spaulders"
	},
	{
		"id": 109936,
		"name": "Crystalbinder Shoulderpads",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109936/crystalbinder-shoulderpads"
	},
	{
		"id": 109937,
		"name": "Leafmender Mantle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109937/leafmender-mantle"
	},
	{
		"id": 109934,
		"name": "Spaulders of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Shoulder",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109934/spaulders-of-burning-focus"
	},
	{
		"id": 109779,
		"name": "Ancient Draenic Loop",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109779/ancient-draenic-loop"
	},
	{
		"id": 109783,
		"name": "Band of the Stalwart Stanchion",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109783/band-of-the-stalwart-stanchion"
	},
	{
		"id": 109775,
		"name": "Bladebinder Ring",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109775/bladebinder-ring"
	},
	{
		"id": 109761,
		"name": "Bloodthorn Band",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109761/bloodthorn-band"
	},
	{
		"id": 109760,
		"name": "Ced's Chiming Circle",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109760/ceds-chiming-circle"
	},
	{
		"id": 109759,
		"name": "Ro-Ger's Brown Diamond Seal",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109759/ro-gers-brown-diamond-seal"
	},
	{
		"id": 109776,
		"name": "Seal of Resilient Fortitude",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109776/seal-of-resilient-fortitude"
	},
	{
		"id": 109762,
		"name": "Signet of Radiant Leaves",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109762/signet-of-radiant-leaves"
	},
	{
		"id": 109778,
		"name": "Signet of the Glorious Protector ",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109778/signet-of-the-glorious-protector"
	},
	{
		"id": 109777,
		"name": "Unsullied Signet",
		"class": "Armor",
		"subclass": "Rings",
		"slot": "Finger",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109777/unsullied-signet"
	},
	{
		"id": 109969,
		"name": "Choker of Weeping Viscera",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109969/choker-of-weeping-viscera"
	},
	{
		"id": 109951,
		"name": "Fireblade Collar",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109951/fireblade-collar"
	},
	{
		"id": 109965,
		"name": "Fistbreak Choker",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109965/fistbreak-choker"
	},
	{
		"id": 109967,
		"name": "Necklace of Holy Deflection",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109967/necklace-of-holy-deflection"
	},
	{
		"id": 109966,
		"name": "Reinforced Bloodsteel Gorget",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109966/reinforced-bloodsteel-gorget"
	},
	{
		"id": 109952,
		"name": "Skulltooth Chain",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109952/skulltooth-chain"
	},
	{
		"id": 109950,
		"name": "Stormshot Choker",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109950/stormshot-choker"
	},
	{
		"id": 109953,
		"name": "Windseal Necklace",
		"class": "Armor",
		"subclass": "Amulets",
		"slot": "Neck",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109953/windseal-necklace"
	},
	{
		"id": 109829,
		"name": "Belt of Burning Focus",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109829/belt-of-burning-focus"
	},
	{
		"id": 109842,
		"name": "Blackwater Belt",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109842/blackwater-belt"
	},
	{
		"id": 109830,
		"name": "Bloodfeather Girdle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109830/bloodfeather-girdle"
	},
	{
		"id": 109831,
		"name": "Crystalbinder Belt",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109831/crystalbinder-belt"
	},
	{
		"id": 109832,
		"name": "Leafmender Girdle",
		"class": "Armor",
		"subclass": "Leather Armor",
		"slot": "Waist",
		"quality": "Rare",
		"wowhead_link": "https://www.wowhead.com/item=109832/leafmender-girdle"
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
	for(let i=0; i<slots.length; i++)
	{
		let slot = slots[i];

		if(slot.can_socket == undefined || slot.can_socket == false)
			slot.can_socket = false;

		if(slot.ignore == undefined || slot.ignore == false)
			slot.ignore = false;

		slot.item_score = 0;
		slot.warforged = false;
		slot.socket = false;
		slot.tertiary = "";

		let starter_item = starter_gear_set.find(starter_item => starter_item.slot == slot.name);

		if(starter_item == undefined)
		{
			slot.item_id = 0;
			slot.ilevel = 0;
		}
		else
		{
			slot.item_id = starter_gear_set[i].item.id;
			slot.ilevel = starter_gear_set[i].item.ilevel;
			let item = get_item_by_item_id(starter_gear_set[i].item.id);
			slot.item_quality = item.quality;
		}
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
	{
		item_score = item.ilevel;
	}

	if(item.tertiary == "avoidance" || item.tertiary == "indestructible")
	{
		//item_score += 1;
	}
	else if(item.tertiary == "leech")
	{
		item_score += 2;
	}
	else if(item.tertiary == "speed")
	{
		item_score += 4;
	}

	if(item.socket)
	{
		item_score += 10;
	}

//	if(item.warforged)
//	{
//		item_score += 100;
//	}

	return item_score;
}

function upgrade_slot(item, slot1, slot2/*optional*/)
{
	let item_score = get_item_score(item);
	let slot = slot1;

	let upgrade_score = item_score - slot1.item_score;

	let upgrade_score1 = upgrade_score;

	if(slot2 != undefined)
	{
		let upgrade_score_2 = item_score - slot2.item_score;

		//console.log(item.id + ", 1: " + slot1.item_id + "2:" + slot2.item_id);

		// Check if already equipped and whether to upgrade slot 1 or 2
		if(item.id == slot1.item_id) 
		{
			// Already equipped in slot 1 so can upgrade slot 1
		}
		else if(item.id == slot2.item_id)
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

	if(upgrade_score > 0)
	{
		slot.item_id = item.id;
		slot.item_quality = item.quality;
		slot.ilevel = item.ilevel;
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

function init_gear_box()
{
	let gear_box = document.getElementById("gear-box");

	for(let i=0; i<slots.length; i++)
	{
		let row = document.createElement("div");
		row.setAttribute("class", "row row-border");
		gear_box.appendChild(row);

		let name_cell = document.createElement("div");
		name_cell.setAttribute("id", slots[i].name + "-name-cell");
		name_cell.setAttribute("class", "column");
		row.appendChild(name_cell);

		let bonus_cell = document.createElement("span");
		bonus_cell.setAttribute("id", slots[i].name + "-bonus-cell");
		bonus_cell.setAttribute("class", "bonus-cell");
		row.appendChild(bonus_cell);
	}
}

function update_slots()
{
	for(let i=0; i<slots.length; i++)
	{
		let slot = slots[i];
		let name_cell = document.getElementById(slots[i].name + "-name-cell");
		let bonus_cell = document.getElementById(slots[i].name + "-bonus-cell");
		let bonus_text = "";

		// Remove existing link
		while(name_cell.hasChildNodes())
		name_cell.removeChild(name_cell.lastChild);

		if(slots[i].item_id != 0)
		{
			let item = get_item_by_item_id(slots[i].item_id);
			let wowhead_link = "", wowhead_bonus = "", wowhead_link_colour = "colour-rare";

			let anchor = document.createElement("a");
			wowhead_link = item.wowhead_link;

			if(slot.item_quality == "Heirloom")
			{
				wowhead_link_colour = "colour-heirloom";
			}
			else if(slot.item_quality == "Epic")
			{
				wowhead_link_colour = "colour-epic";
			}

			if(slot.warforged)
			{
				wowhead_bonus += "4746";
				//bonus_text += " [wf]";
				bonus_text += " [warforged]";
			}

			if(slot.socket)
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "8810";
				//bonus_text += " [sk]";
				bonus_text += " [socket]";
			}

			if(slot.tertiary == "avoidance")
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "40";
				//bonus_text += " [av]";
			}
			else if(slot.tertiary == "indestructible")
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "43";
				//bonus_text += " [in]";
			}
			else if(slot.tertiary == "leech")
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "41";
				//bonus_text += " [le]";
			}
			else if(slot.tertiary == "speed")
			{
				if(wowhead_bonus.length > 0)
				{
					wowhead_bonus += ":";
				}
				wowhead_bonus += "42";
				//bonus_text += " [sp]";
			}

			if(wowhead_bonus.length > 0)
			{
				wowhead_link += "?bonus=" + wowhead_bonus;
			}

			wowhead_link += "&ilvl=" + slots[i].ilevel;
			anchor.setAttribute("href", wowhead_link);
			anchor.setAttribute("class", wowhead_link_colour);

			anchor.textContent = item.name;

			name_cell.appendChild(anchor);

			if(slot.tertiary.length > 0)
			{
				bonus_text += " [" + slot.tertiary + "]";
			}

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
	for(i=0; i<slots.length; i++)
	{
		if(slots[i].ignore == false && (slots[i].warforged == false ||
			(slots[i].can_socket == true && slots[i].socket == false) ||
			slots[i].tertiary == "" || slots[i].tertiary != "speed"))
			return false;
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
		item.tertiary = tertiaries[rand_int(0, tertiaries.length-1)];
	}
	else
		item.tertiary = "";

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

		//if(is_fully_warforged())
		if(is_fully_upgraded())
			keep_running = false;
	}

	if(keep_running)
		timer_id = setTimeout(step, interval);
}

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

	if(keep_running == true)
		resume();
}

function init_counts()
{
	dungeon_index = 0;
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
	init_slots();
	update_slots();
	update_stats();
}

window.onload = function onLoad()
{
	init_gear_box();
	reset();
}
