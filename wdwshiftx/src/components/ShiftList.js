import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditShiftBtn from './EditShiftBtn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import PhoneIcon from '@material-ui/icons/Phone';
import UserName from './UserName';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: '0 auto 5px',
	},
	heading: {
		display: 'flex',
		fontSize: '1.25em',
		flex: '1',
	},
	time: {
		width: '6em',
	},
	shiftName: {
		paddingLeft: '9px',
	},
	editDelete: {
		display: 'flex',
		position: 'absolute',
		right: '50px',
		flex: '1',
		alignItems: 'baseline',
	},
	delete: {
		fontSize: 'large',
		color: 'rgba(0,0,0,0.25)',
		'&:hover': {
			color: 'black',
		},
	},
	details: {
		width: '100%',
		textAlign: 'left',
	},
	information: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'spaceBetween',
	},
	detailTop: {
		flex: '1',
	},
	comments: {
		font: 'normal smaller Montserrat ',
		paddingBottom: '8px',
	},
	owner: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	contacting: {
		display: 'flex',
		alignItems: 'center',
	},
	contact: {
		marginRight: '5px',
	},
	divide: {
		margin: '8px 0px',
	},
	keywordChips: {
		paddingTop: '5px',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
}));

// Gives the times from the passed time information
function postTime(time) {
	var d = new Date(time);
	const minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes();
	const hours = d.getHours().toString().length === 1 ? '0' + d.getHours() : d.getHours();
	return hours + ':' + minutes;
}

// Calculates and return the difference between start and end times
function timeDiff(time1, time2) {
	var d1 = new Date(time1);
	const d1minutes = d1.getMinutes();
	const d1hours = d1.getHours();
	var d2 = new Date(time2);
	const d2minutes = d2.getMinutes();
	const d2hours = d2.getHours();
	return (d2hours * 60 + d2minutes - (d1hours * 60 + d1minutes)) / 60;
}

// Template for Shifts with mapping through each shift that are in the next 2 weeks
function ShiftList(props) {
	const classes = useStyles();
	const d = new Date();

	return (
		<div>
			{props.shifts.map((shift) => {
				if (shift.start.getDate() === d.getDate() + props.date) {
					return (
						<div className={classes.root}>
							<Accordion key={shift.id}>
								<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
									<div className={classes.heading}>
										<div className={classes.time}>
											{postTime(shift.start)} - {postTime(shift.end)}
										</div>
										<div className={classes.shiftName}>{shift.shiftName}</div>
										<div className={classes.editDelete}>
											<EditShiftBtn />
											<DeleteForeverIcon
												className={classes.delete}
												onClick={(event) => {
													event.stopPropagation();
												}}
											/>
										</div>
									</div>
								</AccordionSummary>
								<AccordionDetails style={{ borderTop: '1px solid rgba(0,0,0,0.25' }}>
									<div className={classes.details}>
										<div className={classes.information}>
											<div className={classes.detailTop}>Comments:</div>
											<div className={classes.duration}>Duration: {timeDiff(shift.start, shift.end)} hours</div>
										</div>
										<div className={classes.comments}>{shift.comments}</div>
										<div className={classes.owner}>
											<div className={classes.userName}>
												<UserName shifts={props.shifts} />
											</div>
											<div className={classes.contacting}>
												<div className={classes.contact}>Contact Me:</div>
												<PhoneIcon fontSize="small" color="disabled" />
											</div>
										</div>
										<Divider className={classes.divide} />
										<div className={classes.keywordChips}>
											Keywords: <Chip variant="outlined" size="small" label={shift.shiftName} />
											{shift.keywords.map((keyword) => (
												<Chip variant="outlined" size="small" label={keyword} />
											))}
										</div>
									</div>
								</AccordionDetails>
							</Accordion>
						</div>
					);
				} else {
					return '';
				}
			})}
		</div>
	);
}

export default ShiftList;
