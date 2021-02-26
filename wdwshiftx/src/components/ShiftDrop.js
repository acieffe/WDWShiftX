import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { shiftItems } from '../data/ShiftData';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: '0 auto 5px',
	},
	heading: {
		display: 'flex',
	},
	shiftName: {
		flex: '1',
		textAlign: 'center',
		paddingLeft: '9px',
	},
}));

export default function SimpleAccordion() {
	const classes = useStyles();

	return (
		<shiftItems>
			{shiftItems.map((shift) => (
				<div className={classes.root}>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography className={classes.heading}>
								<div className={classes.time}>
									{shift.startTime} - {shift.endTime}
								</div>
								<div className={classes.shiftName}>{shift.shiftName}</div>
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ borderTop: '1px solid grey' }}>
							<Typography>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
							</Typography>
						</AccordionDetails>
					</Accordion>
				</div>
			))}
		</shiftItems>
	);
}
