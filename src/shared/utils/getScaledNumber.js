const getScaledNumber = number => {
	if (!number) return null;

	const scaler = 10000;
	let scale = 0;
	let rest = Number(number);
	const dic = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간'];

	while (rest >= scaler && scale < dic.length) {
		rest /= scaler;
		scale += 1;
	}
	const scaled = `${parseFloat(rest?.toFixed(2))}${dic[scale]}`;

	return scaled;
};

export default getScaledNumber;
