import { useState } from "react";
import styled from "styled-components";
import {
	getWeatherByGeolocation,
	getWeatherByInput,
} from "../utils/getWeather";
import GpsIcon from "./GpsIcon";

export default function Input({ setData, setLocation, theme }) {
	const [value, setValue] = useState("");

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await getWeatherByInput(value);

		setData(result.data);
		setLocation(result.location);

		setValue("");
	};

	const handleClick = async () => {
		const result = await getWeatherByGeolocation();

		setData(result.data);
		setLocation(result.location);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<StyledInput
				onChange={handleChange}
				value={value}
				placeholder="Enter location..."
			/>
			<Button onClick={handleClick}>
				<GpsIcon color={theme.primaryLight} />
			</Button>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	align-items: center;
	height: 30px;
`;

const StyledInput = styled.input`
	height: 100%;
	padding: 5px;

	border-radius: 5px 0 0 5px;
	border: none;
	outline: none;

	background: ${(props) => props.theme.primaryLight};
	color: ${(props) => props.theme.text};
	font-family: Roboto;
`;

const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 40px;
	height: 100%;
	padding: 10px;

	outline: none;
	border: none;
	border-radius: 0 5px 5px 0;
	background: ${(props) => props.theme.primary};
	cursor: pointer;
`;
