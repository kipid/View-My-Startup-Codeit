function isEmpty(input) {
	if (
		typeof input === 'undefined' ||
		input === null ||
		input === '' ||
		// input === "null" || // null 문자열. 필요에 따라 주석 해제
		input?.length === 0 ||
		(typeof input === 'object' && !Object.keys(input).length)
	)
		return true;
	return false;
}

export default isEmpty;
