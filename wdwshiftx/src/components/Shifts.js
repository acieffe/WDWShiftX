import React from 'react';
import styled from 'styled-components';
import ShiftsList from './ShiftsList';

function shifts() {
	return (
		<Container>
			<Title>Shifts</Title>
			<ShiftsContainer>
				<ShiftsList />
			</ShiftsContainer>
		</Container>
	);
}

export default shifts;

const Container = styled.div`
	display: grid;
	grid-template-rows: min-content auto;
	text-align: center;
`;

const Title = styled.h1`
	margin: 9px 0px;
	font-style: italic;
`;

const ShiftsContainer = styled.div`
	width: 600px;
	margin: 0 auto;
`;
