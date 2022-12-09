import styled from "styled-components";
import getMoonPhase from "../../utils/getMoonPhase";
import Card from "../Card";
import { device } from "../../styles/breakpoints";

export default function TodayDetails({ data }) {
	const today = data.daily[0];
	const tomorrow = data.daily[1];
	const tomorrowWeather = tomorrow.weather[0].description;
	const { pop, humidity, clouds, wind_speed } = today;

	const moonPhase = getMoonPhase(today.moon_phase);

	const cards = [
		{
			header: "Precipitation",
			icon: "wi-raindrops",
			content: `${pop}%`,
		},
		{
			header: "Humidity",
			icon: "wi-raindrop",
			content: `${humidity}%`,
		},
		{
			header: "Cloud Cover",
			icon: "wi-cloud",
			content: `${clouds}%`,
		},
		{
			header: "Wind",
			icon: "wi-strong-wind",
			content: `${wind_speed} mph`,
		},
		{
			header: "Moon Phase",
			icon: moonPhase.icon,
			content: `${moonPhase.description}`,
		},
		{
			header: "Tomorrow",
			icon: `wi-owm-${tomorrow.weather[0].id}`,
			content: `${tomorrowWeather}`,
		},
	];

	return (
		<Grid>
			{cards.map((card) => (
				<Card header={card.header} key={card.header}>
					<Content>
						<Icon className={`wi ${card.icon}`} />
						<span>{card.content}</span>
					</Content>
				</Card>
			))}
		</Grid>
	);
}

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	justify-items: center;
	justify-content: center;
	gap: 30px;
	width: fit-content;
	height: fit-content;
	margin-left: 80px;

	@media ${device.tablet} {
		margin: 30px auto;
	}

	@media ${device.phone} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		justify-content: space-between;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 200px;
	height: 180px;
	font-family: Roboto;
	color: ${(props) => props.theme.text};

	@media ${device.laptop} {
		width: 180px;
		height: 160px;
	}

	@media ${device.tablet} {
		width: 140px;
		height: 120px;
	}
`;

const Icon = styled.i`
	font-size: 32px;
	color: ${(props) => props.theme.primaryDark};
`;
