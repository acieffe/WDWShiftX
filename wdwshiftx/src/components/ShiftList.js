import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditShiftBtn from './EditShiftBtn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PhoneIcon from '@material-ui/icons/Phone';
import UserName from './UserName';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(() => ({
	shiftList: {
		width: '100%',
	},
	root: { marginBottom: '8px' },
	accordian: {
		borderRadius: '5px',
		marginBottom: '8px',
	},
	summary: {
		paddingLeft: '10px',
	},
	trade: {
		background: 'linear-gradient(90deg, rgba(255, 0, 0, 0.25) 0%, rgba(255,0 ,0,0.25) 2%, rgba(255,255,255,1) 2%)',
	},
	give: {
		background: 'linear-gradient(90deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255,0,0.25) 2%, rgba(255,255,255,1) 2%)',
	},
	either: {
		background: 'linear-gradient(90deg, rgba(0, 0, 255, 0.25) 0%, rgba(0 ,0, 255,0.25) 2%, rgba(255,255,255,1) 2%)',
	},
	heading: {
		display: 'flex',
		flex: '1',
		alignItems: 'baseline',
	},
	time: {
		fontSize: '1.25em',
		textAlign: 'left',
	},
	shiftName: {
		paddingLeft: '6px',
		fontSize: '1em',
	},
	editDelete: {
		display: 'flex',
		position: 'absolute',
		right: '40px',
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
	accordianDetails: {
		borderTop: '1px solid rgba(0,0,0,0.25)',
	},
	details: {
		textAlign: 'left',
		width: '100%',
	},
	information: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'spaceBetween',
	},
	detailTop: {
		flex: '1',
		paddingBottom: '5px',
	},
	comments: {
		font: 'normal smaller Montserrat ',
		paddingBottom: '8px',
		flex: '1',
		width: '100%',
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
	phone: {
		'&:hover': {
			color: 'black',
		},
	},
	divide: {
		margin: '8px 0px',
	},
	contactText: {
		fontSize: '20px',
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
	let difference = 0;
	if (d1.getDate() !== d2.getDate()) {
		difference = ((d2hours + 24 * (d2.getDate() - d1.getDate())) * 60 + d2minutes - (d1hours * 60 + d1minutes)) / 60;
	} else {
		difference = (d2hours * 60 + d2minutes - (d1hours * 60 + d1minutes)) / 60;
	}
	return difference;
}

function isDate(shift, date) {
	const d = new Date();
	let result = false;
	if (shift.start.getDate() === d.getDate() + date) {
		result = true;
	}
	return result;
}

// Template for Shifts with mapping through each shift that are in the next 2 weeks
function ShiftList({ shifts, date }) {
	const classes = useStyles();
	const [user] = useState(JSON.parse(localStorage.getItem('user')));
	const [open, setOpen] = useState(false);
	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<div className={classes.shiftList}>
			{shifts.map((shift) => {
				if (isDate(shift, date)) {
					return (
						<div className={classes.root} key={shift.id}>
							<Accordion className={classes.accordian}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									className={`${classes.summary} ${
										shift.giveTrade === 'Give' ? classes.give : shift.giveTrade === 'Trade' ? classes.trade : classes.either
									}`}
								>
									<div className={classes.heading}>
										<div className={classes.time}>
											{postTime(shift.start)} - {postTime(shift.end)}
										</div>
										<div className={classes.shiftName}>{shift.shiftName}</div>
										{shift.user === user.name ? (
											<div className={classes.editDelete}>
												<EditShiftBtn shift={shift} />
												<DeleteForeverIcon
													className={classes.delete}
													onClick={(event) => {
														event.stopPropagation();
													}}
												/>
											</div>
										) : (
											''
										)}
									</div>
								</AccordionSummary>
								<AccordionDetails className={classes.accordianDetails}>
									<div className={classes.details}>
										<div className={classes.information}>
											<div className={classes.detailTop}>Comments:</div>
											<div className={classes.duration}>Duration: {timeDiff(shift.start, shift.end)} hours</div>
										</div>
										<div className={classes.comments}>{shift.comments}</div>
										<div className={classes.owner}>
											<div className={classes.userName}>
												<UserName username={shift.user} />
											</div>
											<div className={classes.contacting}>
												<div className={classes.contact}>Contact Me:</div>
												<ClickAwayListener onClickAway={handleTooltipClose}>
													<div>
														<Tooltip
															PopperProps={{
																disablePortal: true,
															}}
															onClose={handleTooltipClose}
															open={open}
															disableFocusListener
															disableHoverListener
															disableTouchListener
															title={<span className={classes.contactText}>Text: (208) 557-9223</span>}
														>
															<PhoneIcon fontSize="small" color="disabled" className={classes.phone} onClick={handleTooltipOpen} />
														</Tooltip>
													</div>
												</ClickAwayListener>
											</div>
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
