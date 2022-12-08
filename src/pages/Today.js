import styled from "styled-components";
import Card from "../components/Card";
import TodayDetails from "../components/layout/TodayDetails";
import Overview from "../components/Overview";
import { device } from "../styles/breakpoints";

export default function Today({ location, data }) {
	return (
		<Wrapper>
			<Content>
				<Card>
					<Overview location={location} data={data} />
				</Card>
				<TodayDetails data={data} />
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100vw;
	max-width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: center;
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
