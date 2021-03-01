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
		fontSize: '1.25em',
		flex: '1',
	},
	shiftName: {
		paddingLeft: '9px',
	},
	editDelete: {
		textAlign: 'right',
		flex: '1',
	},
	details: {
		width: '100%',
		textAlign: 'left',
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
								<div className={classes.editDelete}>
									{shift.edit} {shift.delete}
								</div>
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ borderTop: '1px dotted grey' }}>
							<Typography className={classes.details}>
								<h3>Comments:</h3>
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
		</shiftItems>
	);
}
