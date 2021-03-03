import React from 'react';
import styled from 'styled-components';
import ShiftsList from './ShiftsList';
import AddShift from './AddShift';

function shifts() {
	return (
		<Container>
			<ShiftsContainer>
				<TitleHeader>
					<Title>Available Shifts</Title>
					<AddShift />
				</TitleHeader>

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

const TitleHeader = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
`;

const Title = styled.h1`
	margin: 9px auto;
	padding-left: 2em;
	font-style: italic;
`;

const ShiftsContainer = styled.div`
	width: 600px;
	margin: 0 auto;
`;
