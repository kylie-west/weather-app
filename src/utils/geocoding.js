import { Loader } from "@googlemaps/js-api-loader";

// Geocoding takes a location name and returns coordinates that can be used to retrieve weather data
export async function geocode(input) {
	const loader = new Loader({
		apiKey: process.env.REACT_APP_GOOGLE_KEY,
		libraries: ["places"],
	});
	const google = await loader.load();
	const geocoder = new google.maps.Geocoder();
	const service = new google.maps.places.AutocompleteService();

	let placeId, location, latitude, longitude;

	// First, use Google's autocomplete service to predict the best location result based on the user's search input
	await service.getPlacePredictions({ input }, (results, status) => {
		if (status === "OK") {
			let result = results.find((item) => item.types.includes("geocode"));
			if (!result) return;

			placeId = result.place_id;
		} else {
			console.error(
				"An error occurred while retrieving place predictions: ",
				status
			);
		}
	});

	// Then, geocode the place ID from the autocomplete result in order to get the latitude and longitude for the weather API call
	if (placeId) {
		await geocoder.geocode({ placeId }, (results, status) => {
			if (status === "OK") {
				location = results[0].geometry.location;
			} else {
				console.error("An error occurred while geocoding:", status);
			}
		});

		latitude = location.lat();
		longitude = location.lng();
	}

	if (latitude && longitude) {
		return { latitude, longitude };
	} else {
		alert("Sorry, couldn't find that location. :(");
	}
}

// Reverse geocoding takes coordinates and returns a formatted location name
export async function reverseGeocode(latitude, longitude) {
	const loader = new Loader({
		apiKey: process.env.REACT_APP_GOOGLE_KEY,
		libraries: ["places"],
	});
	const google = await loader.load();
	const geocoder = new google.maps.Geocoder();

	let results;
	let cityName;

	await geocoder.geocode(
		{ location: { lat: latitude, lng: longitude } },
		(res, status) => {
			if (status === "OK") {
				results = res;
			} else {
				console.error(
					"Reverse geocode was not successful for the following reason: " +
						status
				);
			}
		}
	);

	cityName = getCityName(results);
	return cityName;
}

// Chooses the best location name out of the array of results provided by Google's geocoding API
function getCityName(geocodingResults) {
	let result,
		addressTypes = [
			"colloquial_area",
			"locality",
			"administrative_area_level_1",
			"administrative_area_level_2",
			"country",
			"political",
		];

	for (let i = 0; !result && i < addressTypes.length; i++) {
		result = geocodingResults.find((item) =>
			item.types.includes(addressTypes[i])
		);
	}

	if (!result && geocodingResults[0]) {
		result = geocodingResults[0]; // Default to first result if nothing else is present
		return;
	} else if (!result && !geocodingResults[0]) {
		console.error("There was a problem retrieving location results");
		return;
	} else {
		return result.formatted_address;
	}
}
