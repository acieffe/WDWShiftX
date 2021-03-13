/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AllKeywords from '../data/AllKeywords';

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(3),
		},
		paddingBottom: '8px',
	},
}));

export default function Tags() {
	const [setValue] = React.useState(null); // need for later values
	const [open, toggleOpen] = React.useState(false);
	const classes = useStyles();

	const handleClose = () => {
		setDialogValue({
			keyword: '',
		});

		toggleOpen(false);
	};

	const [dialogValue, setDialogValue] = React.useState({
		keyword: '',
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		setValue({
			keyword: dialogValue.keyword,
		});

		handleClose();
	};

	return (
		<div className={classes.root}>
			<Autocomplete
				onChange={(event, newValue) => {
					if (typeof newValue === 'string') {
						setValue({
							title: newValue,
						});
					} else if (newValue && newValue.inputValue) {
						// Create a new value from the user input
						setValue({
							title: newValue.inputValue,
						});
					} else {
						setValue(newValue);
					}
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				multiple
				id="tags-outlined"
				options={AllKeywords.map((option) => option.keyword)}
				// This is where the User Default Keywords will show up
				defaultValue={[AllKeywords[0].keyword, AllKeywords[10].keyword, AllKeywords[20].keyword]}
				freeSolo
				renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
				renderInput={(params) => (
					<TextField {...params} variant="outlined" label="Filter Shifts by Keywords" placeholder="Roles, Locations, Etc." />
				)}
			/>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<form onSubmit={handleSubmit}>
					<DialogTitle id="form-dialog-title">Add a new keyword</DialogTitle>
					<DialogContent>
						<DialogContentText>Did you miss any keywords in our list? Please, add it!</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							value={dialogValue.keyword}
							onChange={(event) => setDialogValue({ ...dialogValue, keyword: event.target.value })}
							label="keyword"
							type="text"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
