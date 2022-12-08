export default function getMoonPhase(value) {
	// Takes moon phase value from OpenWeatherMap API and returns an object with the appropriate description (str) and icon code (str)
	// Icon reference: https://erikflowers.github.io/weather-icons/

	/* 
        According to API:
            0 - new moon
            .25 - first quarter
            .5 - full moon
            .75 - third quarter
            1 - new moon
        
        When converting from this number value of 0-1 to days within the 28-day moon cycle, we multiply the value by 29 rather than 28, since a value of 1 can be considered equivalent to the 29th day of the cycle.
    */

	const icons = new Map([
		[1, "wi-moon-alt-new"],
		[2, "wi-moon-alt-waxing-crescent-1"],
		[3, "wi-moon-alt-waxing-crescent-2"],
		[4, "wi-moon-alt-waxing-crescent-3"],
		[5, "wi-moon-alt-waxing-crescent-4"],
		[6, "wi-moon-alt-waxing-crescent-5"],
		[7, "wi-moon-alt-waxing-crescent-6"],
		[8, "wi-moon-alt-first-quarter"],
		[9, "wi-moon-alt-waxing-gibbous-1"],
		[10, "wi-moon-alt-waxing-gibbous-2"],
		[11, "wi-moon-alt-waxing-gibbous-3"],
		[12, "wi-moon-alt-waxing-gibbous-4"],
		[13, "wi-moon-alt-waxing-gibbous-5"],
		[14, "wi-moon-alt-waxing-gibbous-6"],
		[15, "wi-moon-alt-full"],
		[16, "wi-moon-alt-waning-gibbous-1"],
		[17, "wi-moon-alt-waning-gibbous-2"],
		[18, "wi-moon-alt-waning-gibbous-3"],
		[19, "wi-moon-alt-waning-gibbous-4"],
		[20, "wi-moon-alt-waning-gibbous-5"],
		[21, "wi-moon-alt-waning-gibbous-6"],
		[22, "wi-moon-alt-third-quarter"],
		[23, "wi-moon-alt-waning-crescent-1"],
		[24, "wi-moon-alt-waning-crescent-2"],
		[25, "wi-moon-alt-waning-crescent-3"],
		[26, "wi-moon-alt-waning-crescent-4"],
		[27, "wi-moon-alt-waning-crescent-5"],
		[28, "wi-moon-alt-waning-crescent-6"],
	]);

	function getDayInCycle(val) {
		// Get the day within the moon cycle which the value corresponds to
		let day;

		if (val > 0) {
			day = Math.floor(val * 29);
		} else if (val === 0) {
			day = 1;
		}

		return day;
	}

	function getIcon(day) {
		// If it is the 29th day, get the icon for new moon

		let i;

		if (day < 29) {
			i = icons.get(day);
		} else if (day === 29) {
			i = icons.get(1);
		} else {
			console.error("Day in moon cycle cannot be greater than 29");
		}

		return i;
	}

	const dayInCycle = getDayInCycle(value);
	const icon = getIcon(dayInCycle);

	let description;

	switch (true) {
		case dayInCycle === 0 || dayInCycle === 29:
			description = "new moon";
			break;
		case dayInCycle > 0 && dayInCycle < 8:
			description = "waxing crescent";
			break;
		case dayInCycle === 8:
			description = "first quarter";
			break;
		case dayInCycle > 8 && dayInCycle < 15:
			description = "waxing gibbous";
			break;
		case dayInCycle === 15:
			description = "full moon";
			break;
		case dayInCycle > 15 && dayInCycle < 22:
			description = "waning gibbous";
			break;
		case dayInCycle === 22:
			description = "third quarter";
			break;
		case dayInCycle > 22 && dayInCycle <= 29:
			description = "waning crescent";
			break;
		default:
			return;
	}

	const moonPhase = { description, icon };

	console.log(`It's day ${dayInCycle} in the moon cycle.`);
	return moonPhase;
}
