import json, random

WARFORGED_CHANCE_PERCENT = 5
ITERATIONS = 10

url_base = "https://www.wowhead.com/item="

def roll_dice(percent):
	return random.uniform(0, 100) <= percent

def load_dungeons():
	f = open("dungeons.json")
	dungeons = json.load(f)
	f.close()

	return dungeons

def load_items():
	f = open("items.json")
	items = json.load(f)
	f.close()

	return items

def init_slots(slots):
	for slot in slots:
		slots[slot]["item_id"] = 0
		slots[slot]["warforged"] = False

def load_slots():
	f = open("slots.json")
	slots = json.load(f)
	f.close()

	return slots

def print_slots(slots, items):
	for slot in slots:
		output = slot + " - "

		if "item_id" in slots[slot]:
			if slots[slot]["item_id"] != 0:
				item_name = items[str(slots[slot]["item_id"])]
				output = output + items[str(slots[slot]["item_id"])]["name"]

				if "warforged" in slots[slot]:
					if slots[slot]["warforged"] == True:
						output = output + " (Warforged)"

		print(output)

def print_all():
	dungeons = load_dungeons()
	items = load_items()
	for dungeon in dungeons:
		print("Dungeon: " + dungeon["name"])
		for boss in dungeon["bosses"]:
			print("\tBoss: " + boss["name"])
			for item_id in boss["loot"]:
				print("\t\t" + str(item_id) + ", " + items[str(item_id)]["name"]+ ", " + items[str(item_id)]["class"]+ ", " +
		  			items[str(item_id)]["subclass"]+ ", " + items[str(item_id)]["slot"])

def print_csv():
	dungeons = load_dungeons()
	print("dungeon,boss,item_id")
	for dungeon in dungeons:
		print(dungeon["name"] + ",,")
		for boss in dungeon["bosses"]:
			print("," + boss["name"] + ",")
			for item_id in boss["loot"]:
				print(",," + str(item_id))

def print_items():
	items = load_items()
	for item in items:
		print(item + ", " + items[item]["name"])

def do_something():
	return 0

def run():
	dungeons = load_dungeons()
	items = load_items()
	slots = load_slots()

	init_slots(slots)

	#print_slots(slots)

	for i in range(ITERATIONS):
		for dungeon in dungeons:
			#print("Dungeon: " + dungeon["name"])
			for boss in dungeon["bosses"]:
				# Pick an item of loot
				item_count = len(boss["loot"])
				rand_loot_index = random.randint(0, item_count - 1)
				item_id = boss["loot"][rand_loot_index]
				item = items[str(item_id)]

				# Is it warforged?
				warforged = roll_dice(WARFORGED_CHANCE_PERCENT)
				#print("\tBoss: " + boss["name"] + ", item: " + item["name"] + ", warforged: " + str(warforged))

				slot = item["slot"]

				if slot == "Trinket":
					slot = "Trinket 1"
				elif slot == "Two-Hand":
					slot = "Main Hand"
				elif slot == "Finger":
					# Rings are unique-equipped
					
					# Default to Finger 1
					slot = "Finger 1"

					if (slots["Finger 1"]["item_id"] != 0 and \
						slots["Finger 1"]["item_id"] != item_id) or \
							slots["Finger 1"]["warforged"] == True:
						# If Finger 1 slot is not empty
						# and the item isn't already equipped in Finger 1
						# or Finger 1 is warforged
						slot = "Finger 2"

				# Check if its an upgrade
				if slots[slot]["item_id"] == 0 or (slots[slot]["warforged"] == False and warforged == True):
					slots[slot]["item_id"] = item_id
					slots[slot]["warforged"] = warforged

	print_slots(slots, items)

run()
