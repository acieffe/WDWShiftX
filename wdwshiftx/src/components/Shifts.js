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

function Shifts({ shifts, getKeywords, keywords }) {
	const classes = useStyles();

	return (
		<div className={classes.shiftsContainer}>
			<div className={classes.titleHeader}>
				<h1 className={classes.title}>Available Shifts</h1>
				<AddShift keywords={keywords} />
			</div>
			<Keywords getKeywords={getKeywords} keywords={keywords} />
			<ShiftDay shifts={shifts} keywords={keywords} />
		</div>
	);
}

export default Shifts;
