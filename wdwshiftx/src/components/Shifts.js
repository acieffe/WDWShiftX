import React from 'react';
import ShiftDay from './ShiftDay';
import AddShift from './AddShift';
import { makeStyles } from '@material-ui/core/styles';
import { ShiftItems } from '../data/ShiftData';
import { useEffect, useState } from 'react';

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

function allFilters(shift) {
	let resull = false;
	if (hasKeywords(shift) && isShiftType(shift.giveTrade) && isStartTime(shift)) {
		resull = true;
	}
	return resull;
}

function hasKeywords(shift) {
	let localRoles = [JSON.parse(localStorage.getItem('shiftFilters')).role];
	let localLocations = [JSON.parse(localStorage.getItem('shiftFilters')).location];
	let localKeywords = [JSON.parse(localStorage.getItem('shiftFilters')).keywords];
	let result = false;

	if (
		localRoles.includes(shift.role) &&
		localLocations.includes(shift.location) &&
		(shift.comments.includes(localKeywords) || shift.shiftName.includes(localKeywords))
	) {
		result = true;
	}
	return result;
}

function isShiftType(shiftType) {
	let result = false;

	if (shiftType === shiftType) {
		result = true;
	}

	return result;
}

function isStartTime(shift) {
	let result = false;

	if (shift.shiftName === shift.shiftName) {
		result = true;
	}

	return result;
}

function Shifts() {
	const classes = useStyles();
	const [shifts, setShifts] = useState([]);

	const getShifts = () => {
		setShifts(
			ShiftItems.map((doc) => {
				return {
					id: doc.id,
					shiftName: doc.shiftName,
					giveTrade: doc.giveTrade,
					start: new Date(doc.start),
					end: new Date(doc.end),
					role: doc.role,
					location: doc.location,
					user: doc.user,
					addInfo: doc.addInfo,
				};
			})
		);
	};

	useEffect(() => {
		getShifts();
	}, []);

	return (
		<div className={classes.shiftsContainer}>
			<div className={classes.titleHeader}>
				<h1 className={classes.title}>Available Shifts</h1>
				<AddShift />
			</div>
			<ShiftDay shifts={shifts} />
		</div>
	);
}

export default Shifts;
