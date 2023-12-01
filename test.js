var array = [
	{ "name": "Head" },
	{ "name": "Neck", "ignore": true },
	{ "name": "Shoulder", "ignore": false }
];

for(let i=0; i<array.length; i++)
	console.log(array[i].name + ", " + array[i].ignore);