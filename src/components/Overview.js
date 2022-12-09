import styled from "styled-components";
import { device } from "../styles/breakpoints";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

export default function Overview({ location, data }) {
	const current = data.current;
	const today = data.daily[0];
	const time = formatTime(current.dt, data.timezone);
	const weather = current.weather[0];
	const currentTemp = Math.round(current.temp);
	const maxTemp = Math.round(today.temp.max);
	const minTemp = Math.round(today.temp.min);

	return (
		<Wrapper>
			<Location>{location}</Location>
			<div>{weather.description}</div>
			<Icon className={`wi wi-owm-${weather.id}`} />
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

function formatTime(timestamp, timezone) {
	dayjs.extend(utc);
	dayjs.extend(tz);

	return dayjs.unix(timestamp).tz(timezone).format("h:mm A");
}
