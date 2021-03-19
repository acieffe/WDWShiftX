import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShiftList from './ShiftList';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: '0 auto 5px',
	},
	days: {
		fontSize: '1.25em',
		fontWeight: 'bolder',
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

// Template for Shifts with mapping through each shift that are in the next 2 weeks
function ShiftDay(props) {
	const classes = useStyles();
	const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 2 weeks of days

	return (
		<div>
			{nums.map((value) => {
				return (
					// Cycles through the next 14 days
					<div className={classes.root} key={value.toString()}>
						<Accordion defaultExpanded="true">
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								style={{ background: 'rgba(60,100,230,0.5)', borderRadius: '5px 5px 0px 0px' }}
							>
								<div className={classes.days}>{postDate(value)}</div>
							</AccordionSummary>
							<AccordionDetails>
								<ShiftList shifts={props.shifts} date={value} keywords={props.keywords} />
							</AccordionDetails>
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default ShiftDay;
