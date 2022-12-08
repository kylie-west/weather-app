import styled from "styled-components";
import Card from "../Card";
import { device } from "../../styles/breakpoints";

export default function TodayDetails() {
	return (
		<Grid>
			{cards.map((card) => (
				<Card header={card.header} key={card.header}>
					<Content>
						<i>{card.icon}</i>
						<p>{card.content}</p>
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
	justify-content: space-around;
	gap: 30px;
	width: fit-content;
	height: fit-content;
	margin-left: 80px;

	@media ${device.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		margin: 30px auto;
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

	@media ${device.laptop} {
		width: 180px;
		height: 160px;
	}

	@media ${device.tablet} {
		width: 120px;
		height: 100px;
	}
`;

const cards = [
	{
		header: "Precipitation",
		icon: "rain icon",
		content: "?%",
	},
	{
		header: "Humidity",
		icon: "drop icon",
		content: "?%",
	},
	{
		header: "Cloud Cover",
		icon: "cloud icon",
		content: "?%",
	},
	{
		header: "Wind",
		icon: "wind icon",
		content: "? mph",
	},
	{
		header: "Moon Phase",
		icon: "moon icon",
		content: "???",
	},
	{
		header: "Tomorrow",
		icon: "weather icon",
		content: "???",
	},
];
