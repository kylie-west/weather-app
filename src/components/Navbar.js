import styled from "styled-components";

export default function Navbar({ children }) {
	return (
		<Nav>
			<Wrapper>{children}</Wrapper>
		</Nav>
	);
}

const Nav = styled.nav`
	position: fixed;
	top: 0;

	width: 100vw;
	padding: 15px;

	background-color: silver;
`;

const Wrapper = styled.div`
	display: flex;
	gap: 10px;

	width: 80vw;
	margin: 0 auto;
`;
