import { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import { reverseGeocode } from "./utils/geocoding";
import { getWeatherByGeolocation } from "./utils/getWeather";

export default function App() {
	const [data, setData] = useState();
	const [location, setLocation] = useState();

	useEffect(() => {
		(async () => {
			const res = await getWeatherByGeolocation();
			setLocation(await reverseGeocode(res.lat, res.lon));
			setData(res);
		})();
	}, []);

	return (
		<Wrapper className="App">
			<Navbar>
				<Input />
				<button>Today</button>
			</Navbar>
			{data ? <Today location={location} data={data} /> : "Loading..."}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	max-width: 100vw;
	min-height: 100vh;
	background-color: gray;
`;
