import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: '10px',
	},
	textField: {
		margin: '18px auto',
	},
	timeInput: {
		flex: '1',
	},
	startTime: {
		width: '45%',
		marginRight: '5%',
	},
	endTime: {
		width: '45%',
		marginLeft: '5%',
	},
	btn: {
		margin: '20px auto 0px',
	},
	inputs: {
		marginTop: '10px',
	},
}));

export default function DateAndTimePickers() {
	const classes = useStyles();

	return (
		<form className={classes.container} noValidate>
			<div className={classes.timeInput}>
				<TextField
					id="start-datetime-local"
					label="Start Time"
					required
					type="datetime-local"
					className={classes.startTime}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="end-datetime-local"
					label="End Time"
					required
					type="datetime-local"
					className={classes.endTime}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<TextField id="standard" label="Shift Name" className={classes.inputs} required fullWidth />
			<TextField
				id="standard-multiline-static"
				className={classes.inputs}
				label="Comments"
				multiline
				rows={4}
				defaultValue="Additional Information"
				fullWidth
			/>
			<div className={classes.btn}>
				<Button variant="contained" color="primary">
					Edit Shift
				</Button>
			</div>
		</form>
	);
}
