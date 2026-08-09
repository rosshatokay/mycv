/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
	const kWords = (k) => {
		let hours = 0
		for (const p of piles) {
			hours += Math.ceil(p / k)
		}

		return hours <= h
	}

	let low = 0
	let high = Math.max(...piles)

	while (low < high) {
		const mid = Math.floor((low + high) / 2)

		if (kWords(mid)) {
			high = mid
		} else {
			low = mid + 1
		}
	}

	return high
};

console.log(minEatingSpeed([3,6,7,11], 8))