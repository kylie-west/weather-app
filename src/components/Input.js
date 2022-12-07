import styled from "styled-components";

export default function Input() {
	const Input = styled.input`
		height: 30px;
		padding: 5px;

		border-radius: 5px;
		border: none;
		outline: none;
	`;

	return (
		<form>
			<Input placeholder="Enter location..." />
		</form>
	);
}
