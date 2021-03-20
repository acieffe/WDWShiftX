import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NewShiftInput from './NewShiftInput';

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

function NewShift(props) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Add Shift:</h1>
			<div className={classes.formContainer}>
				<NewShiftInput />
			</div>
		</div>
	);
}

export default NewShift;
