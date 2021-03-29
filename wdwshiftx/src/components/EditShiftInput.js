import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import Keywords from './Keywords';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: '12px',
	},
	btn: {
		margin: '20px auto 0px',
	},
	time: {
		marginBottom: theme.spacing(1),
	},
	inputs: {
		marginBottom: theme.spacing(3),
	},
	commentSection: {},
	commentHelp: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		zIndex: '80',
	},
}));

function EditShiftInput({ keywords }) {
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
			<Grid className={classes.time} container spacing={3}>
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
				<Grid item xs={6}>
					<TextField
						id="start"
						name="start"
						label="Start Time"
						required
						type="datetime-local"
						step="3000"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="end"
						name="end"
						label="End Time"
						required
						type="datetime-local"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={12}>
					<TextField id="shiftName" name="shiftName" label="Shift Name" className={classes.inputs} required fullWidth />
				</Grid>
			</Grid>
			<div className={classes.commentSection}>
				<TextField
					id="comments"
					name="comments"
					className={classes.inputs}
					label="Comments"
					multiline
					placeholder="Additional Information"
					fullWidth
				/>
			</div>
			<Keywords keywords={keywords} />
			<div className={classes.btn}>
				<Button variant="contained" color="primary">
					Edit Shift
				</Button>
			</div>
		</form>
	);
}

export default EditShiftInput;
