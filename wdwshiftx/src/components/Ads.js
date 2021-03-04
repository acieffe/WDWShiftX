import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	bigContainer: {
		height: '90px',
		textAlign: 'center',
		transitionDuration: '1s',
		transitionProperty: 'height',
	},
	smallContainer: {
		height: '5px',
		textAlign: 'center',
		transitionDuration: '1s',
		transitionProperty: 'height',
	},
	close: {
		position: 'absolute',
		top: '5px',
		right: '10px',
		cursor: 'pointer',
	},
}));

export default function Ads() {
	const classes = useStyles();

	// const changeHeight = () => {
	// 	console.log(document.querySelector('div[className]'));
	// };

	return (
		<div className={classes.bigContainer}>
			{/* <div onClick={changeHeight} className={classes.close}>
				X
			</div> */}
			<h3>Hello! Ads Will Go Here!</h3>
		</div>
	);
}
