import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { shiftItems } from '../data/ShiftData';
import EditShiftBtn from '../components/EditShiftBtn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: '0 auto 5px',
	},
	days: {
		fontSize: '1.25em',
		fontWeight: 'bolder',
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
}));

// Gives the date and adds the next 14 days
function postDate(i) {
	var d = new Date();
	d.setDate(d.getDate() + i);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

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
export default function SimpleAccordion() {
	const classes = useStyles();
	const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 2 weeks of days

	return (
		<shiftItems>
			{nums.map((value) => {
				return (
					<div className={classes.root}>
						<Accordion defaultExpanded="true">
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								style={{ background: 'rgba(60,100,230,0.5)', borderRadius: '5px 5px 0px 0px' }}
							>
								<div className={classes.days}>{postDate(value)}</div>
							</AccordionSummary>
							<AccordionDetails style={{ borderTop: '1px solid rgba(0,0,0,0.25' }}>
								<div>
									{shiftItems.map((shift) => (
										<div className={classes.root}>
											<Accordion>
												<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
													<Typography className={classes.heading}>
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
													</Typography>
												</AccordionSummary>
												<AccordionDetails style={{ borderTop: '1px solid rgba(0,0,0,0.25' }}>
													<Typography className={classes.details}>
														<div className={classes.information}>
															<h3 className={classes.detailTop}>Comments:</h3>
															<h5>Duration: {timeDiff(shift.start, shift.end)} hours</h5>
														</div>
														<p className={classes.comments}>{shift.comments}</p>
														<div className={classes.owner}>
															<h4>~{shift.owner}</h4>
															<div className={classes.contacting}>
																<h4 className={classes.contact}>Contact Me:</h4>
																{shift.contact}
															</div>
														</div>
													</Typography>
												</AccordionDetails>
											</Accordion>
										</div>
									))}
								</div>
							</AccordionDetails>
						</Accordion>
					</div>
				);
			})}
		</shiftItems>
	);
}
