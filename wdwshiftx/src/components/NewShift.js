import React from 'react';
import styled from 'styled-components';
import NewShiftInput from './NewShiftInput';

function NewShift(props) {
	return (
		<Container>
			<Title>Add Shift:</Title>
			<FormContainer>
				<NewShiftInput keywords={props.keywords} />
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
	font-style: italic;
`;

const FormContainer = styled.div`
	width: 450px;
	margin: 0 auto;
`;
