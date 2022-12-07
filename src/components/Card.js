import styled from "styled-components";

export default function Card({ children }) {
	const Card = styled.div`
		display: flex;
		flex-direction: column;

		width: fit-content;

		padding: 20px;
		border-radius: 5px;

		background-color: white;
	`;

	return <Card>{children}</Card>;
}
