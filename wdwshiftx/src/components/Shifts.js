import React from 'react';
import ShiftDay from './ShiftDay';
import AddShift from './AddShift';
import Keywords from './Keywords';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	shiftsContainer: {
		display: 'grid',
		gridTemplateRows: 'minContent auto',
		textAlign: 'center',
		margin: '40px 0 100px',
		padding: '0 10px 100px',
	},
	titleHeader: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		margin: '9px auto',
		paddingLeft: '3em',
		fontStyle: 'italic',
	},
}));

function Shifts(props) {
	const classes = useStyles();

	return (
		<div className={classes.shiftsContainer}>
			<div className={classes.titleHeader}>
				<h1 className={classes.title}>Available Shifts</h1>
				<AddShift keywords={props.keywords} />
			</div>
			<Keywords keywords={props.keywords} />
			<ShiftDay shifts={props.shifts} />
		</div>
	);
}

export default Shifts;
