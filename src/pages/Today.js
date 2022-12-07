import styled from "styled-components";
import Card from "../components/Card";
import Overview from "../components/Overview";

export default function Today() {
	const Wrapper = styled.div`
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		background-color: gray;
	`;

	const Content = styled.div`
		width: 80vw;
		margin-top: 150px;
	`;

	return (
		<Wrapper>
			<Content>
				<Card>
					<Overview />
				</Card>
			</Content>
		</Wrapper>
	);
}
