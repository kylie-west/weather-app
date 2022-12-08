import styled from "styled-components";
import { device } from "../styles/breakpoints";

export default function Card({ children, header }) {
	return (
		<CardWrapper>
			{header ? <CardHeader>{header}</CardHeader> : null}
			<Content header={header}>{children}</Content>
		</CardWrapper>
	);
}

const CardWrapper = styled.div`
	width: fit-content;
`;

const CardHeader = styled.div`
	padding: 10px;
	text-align: center;
	border-radius: 10px 10px 0 0;
	background-color: rgba(0, 0, 0, 0.25);
	color: white;

	@media ${device.tablet} {
		padding: 5px;
	}
`;

const Content = styled.div(({ header }) => ({
	width: "fit-content",
	borderRadius: header ? "0 0 10px 10px" : "10px",
	backgroundColor: header ? "rgba(250, 250, 250, 0.5)" : "rgba(0, 0, 0, 0.25)",
	color: header ? "black" : "white",
}));
