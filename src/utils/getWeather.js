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
