import React from 'react';
import styled from 'styled-components';

function Sidebar() {
	return <Container style={{ backgroundColor: 'rgba(200, 0, 200, 0.125' }}>Sidebar</Container>;
}

export default Sidebar;

const Container = styled.div`
	margin-top: 40px;
	height: 100vh;
`;
