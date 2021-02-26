import React from 'react';
import styled from 'styled-components';
import ShiftDrop from './ShiftDrop';

function shifts() {
	return (
		<Container>
			<h1>Shifts</h1>
			<ShiftsContainer>
				<ShiftsGroup>
					<ShiftsDay></ShiftsDay>
					<ShiftDrop />
				</ShiftsGroup>
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

const ShiftsContainer = styled.div`
	width: 500px;
	margin: 0 auto;
`;

const ShiftsGroup = styled.div``;

const ShiftsDay = styled.div``;
