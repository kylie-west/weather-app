import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import themes from "./styles/themes";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import { getWeatherByGeolocation, getWeatherType } from "./utils/getWeather";

export default function App() {
	const [data, setData] = useState();
	const [location, setLocation] = useState();
	const [weather, setWeather] = useState("clear");
	const [isNight, setIsNight] = useState(false);
	const [theme, setTheme] = useState(themes.clearDay);

	useEffect(() => {
		(async () => {
			const result = await getWeatherByGeolocation();
			setData(result.data);
			setLocation(result.location);
		})();
	}, []);

	useEffect(() => {
		if (data) {
			const now = data.current.dt;
			const sunset = data.current.sunset;

			if (now - sunset > 0) {
				setIsNight(true);
			} else setIsNight(false);

			setWeather(getWeatherType(data));
		}
	}, [data]);

	useEffect(() => {
		if (weather === "clear" && isNight) {
			setTheme(themes.clearNight);
		} else if (weather === "clear") {
			setTheme(themes.clearDay);
		} else {
			setTheme(themes[weather]);
		}
	}, [weather, isNight]);

	return (
		<ThemeProvider theme={theme}>
			<Wrapper className="App">
				<Navbar>
					<Input setData={setData} setLocation={setLocation} theme={theme} />
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
