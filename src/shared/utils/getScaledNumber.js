const getScaledNumber = number => {
	const scaler = 10000;
	let scale = 0;
	let rest = number;
	const dic = ['', '만', '억', '조', '경'];

	while (rest >= scaler) {
		rest /= scaler;
		scale += 1;
	}
	const scaled = `${parseFloat(rest.toFixed(2))}${dic[scale]}`;

	return scaled;
};

export default getScaledNumber;
