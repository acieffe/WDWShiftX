import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InfoIcon from '@material-ui/icons/Info';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: '12px',
	},
	btn: {
		margin: '20px auto 0px',
	},
	time: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: theme.spacing(1),
	},
	timeInput: { margin: 'auto' },
	inputs: { textAlign: 'left' },
	allInput: {
		'& fieldset': {
			border: '2px solid #303F9F',
			borderRadius: '10px',
		},
	},
	where: {
		display: 'flex',
		width: '100%',
		marginBottom: theme.spacing(1),
		border: '2px solid #303F9F',
		borderRadius: '10px',
	},
	naked: {
		flex: '1',
		marginLeft: '8px',
		fontSize: '1em',
	},
	addInfoSection: {
		display: 'flex',
		alignItems: 'baseline',
	},
	commentHelp: {
		paddingLeft: '5px',
		fontSize: '15px',
		color: 'gray',
		'&:hover': {
			color: 'black',
		},
	},
	infoText: {
		fontSize: '20px',
	},
	giveTrade: {},
	radioLabel: {
		color: 'black',
	},
	radios: {
		display: 'flex',
	},
	radio: {
		flex: '1',
	},
}));

function NewShiftInput() {
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
			<div className={classes.time}>
				<div className={classes.timeInput}>
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
						variant="outlined"
						size="small"
						className={classes.allInput}
					/>
				</div>
				<div className={classes.timeInput}>
					<TextField
						id="end"
						name="end"
						label="End Time"
						required
						type="datetime-local"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						size="small"
						className={classes.allInput}
					/>
				</div>
			</div>
			<div className={classes.inputs}>
				<div>
					Role:
					<div className={classes.where}>
						<InputBase
							className={classes.naked}
							id="role"
							name="role"
							placeholder="Attractions, Custodial, Merchandise, etc."
							inputProps={{ 'aria-label': 'naked' }}
							required
							fullWidth
						/>
					</div>
					Location:
					<div className={classes.where}>
						<InputBase
							className={classes.naked}
							id="location"
							name="location"
							placeholder="Magic Kingdom, Disney Springs, All-Star Movies, etc."
							inputProps={{ 'aria-label': 'naked' }}
							required
							fullWidth
						/>
					</div>
					Shift Name:
					<div className={classes.where}>
						<InputBase
							className={classes.naked}
							id="shiftName"
							name="shiftName"
							placeholder='As Seen On "Schedule View"'
							inputProps={{ 'aria-label': 'naked' }}
							required
							fullWidth
						/>
					</div>
					<div className={classes.addInfoSection}>
						<span>Additional Information: </span>
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
									title={
										<span className={classes.infoText}>
											In the comments, please be descriptive: Add special training needed, clock in location, overtime, or just a reason
											why. If this is up for trade, please specify what you are looking to get.
										</span>
									}
								>
									<InfoIcon className={classes.commentHelp} onClick={handleTooltipOpen} />
								</Tooltip>
							</div>
						</ClickAwayListener>
					</div>
					<div className={classes.where}>
						<InputBase
							className={classes.naked}
							id="addInfo"
							name="addInfo"
							placeholder="Additional Information"
							inputProps={{ 'aria-label': 'naked' }}
							required
							multiline
							fullWidth
						/>
					</div>
					<div className={classes.giveTrade}>
						<RadioGroup row aria-label="giveTrade" name="giveTrade" defaultValue="Either" className={classes.radios} required>
							<FormControlLabel className={classes.radio} value="Give" control={<Radio color="primary" />} label="Give" labelPlacement="top" />
							<FormControlLabel
								className={classes.radio}
								value="Trade"
								control={<Radio color="primary" />}
								label="Trade"
								labelPlacement="top"
							/>
							<FormControlLabel
								className={classes.radio}
								value="Either"
								control={<Radio color="primary" />}
								label="Either"
								labelPlacement="top"
							/>
						</RadioGroup>
					</div>
				</div>
			</div>
			<div className={classes.btn}>
				<Button variant="contained" color="primary" type="submit">
					Add Shift
				</Button>
			</div>
		</form>
	);
}

export default NewShiftInput;
