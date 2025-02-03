const generateRandom = () => {
	const letters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
	let result = "";
	for (let i = 0; i < 8; i++) {
		result += letters[Math.floor(Math.random() * letters.length)];
	}
	return result;
};

module.exports = generateRandom;
