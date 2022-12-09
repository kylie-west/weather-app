import { geocode, reverseGeocode } from "./geocoding";

export async function getWeatherByCoordinates(latitude, longitude) {
	let data;

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=2a422365b138d0fd1948b2e88158b02b`
		);
		data = await response.json();
	} catch (error) {
		console.error(error);
	}

	if (data) {
		console.log(data);
		return data;
	} else return;
}

export async function getWeatherByGeolocation() {
	const getUserCoords = () =>
		new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(({ coords }) => {
					resolve(coords);
				});
			} else reject("Something went wrong.");
		});

	const coords = await getUserCoords();
	const { latitude, longitude } = coords;

	const data = await getWeatherByCoordinates(latitude, longitude);
	const location = await reverseGeocode(latitude, longitude);

	return { data, location };
}

export async function getWeatherByInput(input) {
	const coordinates = await geocode(input);
	const { latitude, longitude } = coordinates;

	const data = await getWeatherByCoordinates(latitude, longitude);
	const location = await reverseGeocode(latitude, longitude);

	return { data, location };
}

export function getWeatherType(data) {
	let weather;
	let code = data.current.weather[0].id;

	switch (true) {
		case code >= 800 && code <= 803:
			weather = "clear";
			break;
		case (code >= 200 && code < 300) || code === 771 || code === 781:
			weather = "stormy";
			break;
		case (code >= 300 && code < 400) || (code >= 500 && code < 600):
			weather = "rainy";
			break;
		case code >= 600 && code < 700:
			weather = "snowy";
			break;
		case code > 700 && code < 771:
			weather = "hazy";
			break;
		case code === 803 || code === 804:
			weather = "cloudy";
			break;
		default:
			weather = "clear";
	}

	console.log("Weather type: ", weather);
	return weather;
}
