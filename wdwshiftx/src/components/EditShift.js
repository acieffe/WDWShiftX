import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditShiftInput from './EditShiftInput';

const useStyles = makeStyles(() => ({
	container: {
		display: 'grid',
		gridTemplateRows: 'minContent auto',
		textAlign: 'center',
	},
	title: {
		fontStyle: 'italic',
	},
	formContainer: {
		margin: '0 auto',
	},
}));

function EditShift(props) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Edit Shift:</h1>
			<div className={classes.formContainer}>
				<EditShiftInput />
			</div>
		</div>
	);
}

export default EditShift;
