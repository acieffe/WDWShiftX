import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'grid',
		gridTemplateRows: 'minContent auto',
		textAlign: 'center',
	},
	container2: {
		paddingTop: '12px',
	},
	title: {
		fontStyle: 'italic',
	},
	formContainer: {
		margin: '0 auto',
	},
	inputs: {
		textAlign: 'left',
	},
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
	btn: {
		margin: '20px auto 0px',
	},
}));

function Filters() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Filter Shifts:</h1>
			<div className={classes.formContainer}>
				<form className={classes.container2} noValidate>
					<div className={classes.inputs}>
						<div>
							Role(s):
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
							Location(s):
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
							<div className={classes.keywords}>
								<span>Keywords: </span>
							</div>
							<div className={classes.where}>
								<InputBase
									className={classes.naked}
									id="keywords"
									name="keywords"
									placeholder="Keywords"
									inputProps={{ 'aria-label': 'naked' }}
									required
									multiline
									fullWidth
								/>
							</div>
							<div className={classes.giveTrade}>
								<RadioGroup row aria-label="giveTrade" name="giveTrade" defaultValue="Either" className={classes.radios} required>
									<FormControlLabel
										className={classes.radio}
										value="Give"
										control={<Radio color="primary" />}
										label="Give"
										labelPlacement="top"
									/>
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
							Filter Shifts
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Filters;
