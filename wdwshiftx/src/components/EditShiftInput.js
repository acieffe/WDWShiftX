import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		padding: '10px',
	},
	textField: {
		margin: '18px auto',
	},
	timeInput: {
		flex: '1',
	},
	startTime: {
		width: '45%',
		marginRight: '5%',
	},
	endTime: {
		width: '45%',
		marginLeft: '5%',
	},
	btn: {
		margin: '20px auto 0px',
	},
	inputs: {
		marginTop: '10px',
	},
	commentSection: {
		width: '100%',
	},
	commentHelp: {
		position: 'absolute',
		top: '50%',
		right: '20px',
		zIndex: '80',
	},
}));

export default function DateAndTimePickers() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	return (
		<form className={classes.container} noValidate>
			<div className={classes.timeInput}>
				<TextField
					id="start-datetime-local"
					label="Start Time"
					required
					type="datetime-local"
					className={classes.startTime}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<TextField
					id="end-datetime-local"
					label="End Time"
					required
					type="datetime-local"
					className={classes.endTime}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<TextField id="standard" label="Shift Name" className={classes.inputs} required fullWidth />
			<div className={classes.commentSection}>
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
							title="In the comments, please be descriptive: Add special training needed, clock in location, overtime, or just a reason why. If this is up for trade, please specify what you are looking to get."
						>
							<Button className={classes.commentHelp} onClick={handleTooltipOpen}>
								<InfoIcon />
							</Button>
						</Tooltip>
					</div>
				</ClickAwayListener>
				<TextField
					id="standard-multiline-static"
					className={classes.inputs}
					label="Comments"
					multiline
					rows={4}
					defaultValue="Additional Information"
					fullWidth
				/>
			</div>
			<div className={classes.btn}>
				<Button variant="contained" color="primary">
					Edit Shift
				</Button>
			</div>
		</form>
	);
}
