import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

function Header() {
	return (
		<Container>
			<LogoArea>
				<Logo />
			</LogoArea>
			<UserContainer>
				if (true) {<LoginPrompt>Login</LoginPrompt>} else {<UserName>Hello User</UserName>}
				<UserImg>
					<img src="https://i.imgur.com/6VBx3io.png" />
				</UserImg>
			</UserContainer>
		</Container>
	);
}

export default Header;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: grey;
	box-shadow: 0px 2px 5px;
`;

const LogoArea = styled.div`
	margin-left: 5px;
`;

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	padding-right: 16px;
`;

const LoginPrompt = styled.div`
	display: flex;
	padding-right: 16px;
`;

const UserName = styled.div`
	display: flex;
	padding-right: 16px;
`;

const UserImg = styled.div`
	width: 28px;
	height: 28px;
	border: 2px solid white;
	border-radius: 3px;

	img {
		width: 100%;
	}
`;
