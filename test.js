function myfunction(item)
{
	item.warforged = true;
}

let item1 = {
	"id": 109898,
	"name": "Blackwater Wrap",
	"class": "Armor",
	"subclass": "Leather Armor",
	"slot": "Chest"
};


console.log(JSON.stringify(item1));

myfunction(item1);

console.log(JSON.stringify(item1));