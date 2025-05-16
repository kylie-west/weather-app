import { geocode, reverseGeocode } from "./geocoding";

async function getApiKey() {
	const res = await fetch("/.netlify/functions/getOwmKey");
	const { key } = await res.json();
	return key;
}

export async function getWeatherByCoordinates(latitude, longitude) {
	let data;

	try {
		const key = await getApiKey();
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}`
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

export function getWeatherType(code) {
	let weather;

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

	return weather;
}
