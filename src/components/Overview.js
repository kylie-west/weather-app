import styled from "styled-components";

export default function Overview({ location, data }) {
	const current = data.current;
	const today = data.daily[0];
	const time = formatTime(current.dt);
	const weather = current.weather[0];
	const currentTemp = Math.round(current.temp);
	const maxTemp = Math.round(today.temp.max);
	const minTemp = Math.round(today.temp.min);

	return (
		<Wrapper>
			<Location>{location || "Nowhere"}</Location>
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
	padding: 50px;
`;

const Location = styled.div`
	font-size: 32px;
`;

const Icon = styled.i`
	font-size: 40px;
	margin: 10px 0;
`;

const CurrentTemp = styled.div`
	font-size: 48px;
	font-weight: 200;
`;

function formatTime(timestamp) {
	const date = new Date(timestamp * 1000);
	let h = date.getHours();
	let m = date.getMinutes();
	let session = "AM";

	// H:MM
	m = m < 10 ? "0" + m : m;

	if (h === 0) {
		h = 12;
	}
	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	return `${h}:${m} ${session}`;
}
