export const numberFormatter = (num: number | undefined): string => {
	if (num !== 0 && !num) {
		return "";
	}
	num = Number((num = Math.abs(Number(num) || 0)));

	if (num > 9999 && num <= 999999) {
		if (num % 1000 === 0) {
			return (num / 1000).toFixed(0) + "K+";
		} else {
			if (num / 1000 >= 10 && num / 1000 < 100) {
				return (num / 1000).toFixed(1) + "K+";
			} else if (num / 1000 >= 100) {
				return Math.round(num / 1000) + "K+";
			} else {
				return (num / 1000).toFixed(2) + "K+";
			}
		}
	} else if (num > 999999 && num <= 999999999) {
		if (num % 1000000 === 0) {
			return (num / 1000000).toFixed(0) + "M+";
		} else {
			if (num / 1000000 >= 10 && num / 1000000 < 100) {
				return (num / 1000000).toFixed(1) + "M+";
			} else if (num / 1000000 >= 100) {
				return Math.round(num / 1000000) + "M+";
			} else {
				return (num / 1000000).toFixed(2) + "M+";
			}
		}
	} else if (num > 999999999) {
		if (num % 1000000000 === 0) {
			return (num / 1000000000).toFixed(0) + "B+";
		} else {
			if (num / 1000000000 >= 10 && num / 1000000000 < 100) {
				return (num / 1000000000).toFixed(1) + "B+";
			} else if (num / 1000000000 >= 100) {
				return Math.round(num / 1000000000) + "B+";
			} else {
				return (num / 1000000000).toFixed(2) + "B+";
			}
		}
	} else {
		if (Number.isInteger(num)) {
			return num.toString();
		} else {
			if (num >= 10 && num < 100) {
				return num.toFixed(1);
			} else if (num >= 100) {
				return Math.round(num).toString();
			} else {
				return num.toFixed(2);
			}
		}
	}
};
