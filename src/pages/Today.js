import styled from "styled-components";
import Card from "../components/Card";
import TodayDetails from "../components/layout/TodayDetails";
import Overview from "../components/Overview";
import { device } from "../styles/breakpoints";

export default function Today() {
	return (
		<Wrapper>
			<Content>
				<Card>
					<Overview />
				</Card>
				<TodayDetails />
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	max-width: 100vw;
	background-color: gray;
`;

const Content = styled.div`
	display: flex;
	width: 80vw;
	margin-top: 150px;

	@media ${device.tablet} {
		flex-direction: column;
		align-items: center;
		width: 100vw;
		margin-top: 100px;
	}
`;
