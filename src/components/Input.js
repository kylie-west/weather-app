import styled from "styled-components";

export default function Input() {
	return (
		<form>
			<StyledInput placeholder="Enter location..." />
		</form>
	);
}

const StyledInput = styled.input`
	height: 30px;
	padding: 5px;

	border-radius: 5px;
	border: none;
	outline: none;
`;
