import React from 'react';
import styled from 'styled-components';
import NewShiftInput from './NewShiftInput';

function NewShift() {
	return (
		<Container>
			<Title>New Shift Form</Title>
			<FormContainer>
				<NewShiftInput />
			</FormContainer>
		</Container>
	);
}

export default NewShift;

const Container = styled.div`
	display: grid;
	grid-template-rows: min-content auto;
	text-align: center;
`;

const Title = styled.h1`
	margin: 9px 0px;
	font-style: italic;
`;

const FormContainer = styled.div`
	width: 450px;
	margin: 0 auto;
`;
