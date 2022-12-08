import styled from "styled-components";

export default function Overview() {
	return (
		<Wrapper>
			<div>[location name]</div>
			<div>[local time]</div>
			<div>[weather summary]</div>
			<div>[icon]</div>
			<div>[temperature]</div>
			<div>[high/low]</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
`;
