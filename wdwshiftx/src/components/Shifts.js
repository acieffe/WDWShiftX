import React from 'react';
import styled from 'styled-components';
import ShiftDay from './ShiftDay';
import AddShift from './AddShift';
import Filter from './Filter';

function shifts(props) {
	return (
		<Container>
			<ShiftsContainer>
				<TitleHeader>
					<Title>Available Shifts</Title>
					<AddShift keywords={props.keywords} />
				</TitleHeader>
				<Filter keywords={props.keywords} />
				<ShiftDay shifts={props.shifts} />
			</ShiftsContainer>
		</Container>
	);
}

export default shifts;

const Container = styled.div`
	display: grid;
	grid-template-rows: min-content auto;
	text-align: center;
	margin: 40px 0 100px;
	padding: 0 10px;
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
	padding-bottom: 100px;
`;
