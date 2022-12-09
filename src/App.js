import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import themes from "./styles/themes";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import { reverseGeocode } from "./utils/geocoding";
import { getWeatherByGeolocation } from "./utils/getWeather";
import GpsIcon from "./components/GpsIcon";

export default function App() {
	const [data, setData] = useState();
	const [location, setLocation] = useState();
	const [theme, setTheme] = useState(themes.clearDayTheme);

	useEffect(() => {
		(async () => {
			const res = await getWeatherByGeolocation();
			setLocation(await reverseGeocode(res.lat, res.lon));
			setData(res);
		})();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Wrapper className="App">
				<Navbar>
					<Input />
					<button>
						<GpsIcon color={theme.primaryDark} />
					</button>
				</Navbar>
				{data ? <Today location={location} data={data} /> : "Loading..."}
			</Wrapper>
		</ThemeProvider>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	max-width: 100vw;
	min-height: 100vh;
	background: linear-gradient(
		${(props) => props.theme.primary} 30%,
		${(props) => props.theme.secondary}
	);
`;
