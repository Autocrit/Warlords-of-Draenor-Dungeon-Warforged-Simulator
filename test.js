function rand_int(min, max)
{
	// min and max are inclusive
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1) + min);
}

function roll_dice(percent_chance) {
	return Math.random() * 100 <= percent_chance;
}

let true_count = 0, iterations = 100000000;
for(let i=0; i<iterations; i++) {
	let result = roll_dice(5);
	if(result)
		true_count++;
}

console.log("True: " + true_count);
console.log("True %: " + 100 * true_count / iterations)
