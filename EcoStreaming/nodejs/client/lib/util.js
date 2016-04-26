/**
 * Convert from Javascript's default datetime format to our format.
 */
dateFormat = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month > 9) ? month : ("0" + month);
	var day = date.getDate();
	day = addHeadingZeros(day, 30);
	var hr = date.getHours();
	hr = addHeadingZeros(hr, 23);
	var min = date.getMinutes();
	min = addHeadingZeros(min, 59);
	var sec = date.getSeconds();
	sec = addHeadingZeros(sec, 59);
	var ms = date.getMilliseconds();
	ms = addHeadingZeros(ms, 999);
	return year + "-" + month + "-" + day + " " + hr + ":" + min + ":" + sec + "." + ms;
};

addHeadingZeros = function(val, maxVal) {
	var limit = 10;
	while (limit < maxVal) {
		if (val < limit) {
			val = "0" + val;
		}
		limit = limit * 10;
	}
	return val;
};

// Temperature Converter
celsiusToFahrenheit = function(temperature) {
	return Math.round((9 * temperature / 5) + 32);
};

fahrenheitToCelsius = function(temperature) {
	return Math.round((temperature - 32) * 5 / 9);
};
