import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	frame: {
		marginTop: '38px',
		width: '100%',
		height: '100vh',
	},
}));

function Landing() {
	const classes = useStyles();

	return (
		<div>
			<iframe src="http://shiftx.digitalelegance.com" className={classes.frame} title="Digital Elegance ShiftX Home Page" />
		</div>
	);
}

export default Landing;
