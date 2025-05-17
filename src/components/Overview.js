import styled from "styled-components";
import { device } from "../styles/breakpoints";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default function Overview({ location, data }) {
	const time = getTime(data.timezone);
	const currentTemp = Math.round(data.main.temp);
	const maxTemp = Math.round(data.main.temp_max);
	const minTemp = Math.round(data.main.temp_min);

	return (
		<Wrapper>
			<Location>{location}</Location>
			<div>{data.weather.description}</div>
			<Icon className={`wi wi-owm-${data.weather.id}`} />
			<CurrentTemp>{`${currentTemp}° F`}</CurrentTemp>
			<div>
				{`${maxTemp}°`} / {`${minTemp}°`}
			</div>
			<div>{time}</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	width: 400px;
	padding: 50px;

	@media ${device.phone} {
		min-width: 300px;
		max-width: 85vw;
	}
`;

const Location = styled.div`
	font-size: 32px;
	text-align: center;
`;

const Icon = styled.i`
	font-size: 40px;
	margin: 10px 0;
`;

const CurrentTemp = styled.div`
	font-size: 48px;
	font-weight: 200;
`;

function getTime(offsetInSeconds) {
	dayjs.extend(utc);
	const offsetInMinutes = offsetInSeconds / 60;
	return dayjs().utc().utcOffset(offsetInMinutes).format("h:mm A");
}
