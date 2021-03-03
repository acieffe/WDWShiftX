import React from 'react';
import styled from 'styled-components';
import EditShiftInput from './EditShiftInput';

function EditShift() {
	return (
		<Container>
			<Title>Edit Shift For:</Title>
			<SubTitle>Really Long Group Name</SubTitle>
			<FormContainer>
				<EditShiftInput />
			</FormContainer>
		</Container>
	);
}

export default EditShift;

const Container = styled.div`
	display: grid;
	grid-template-rows: min-content auto;
	text-align: center;
`;

const Title = styled.h1`
	font-style: italic;
`;

const SubTitle = styled.h3`
	font-style: italic;
`;

const FormContainer = styled.div`
	width: 450px;
	margin: 0 auto;
`;
