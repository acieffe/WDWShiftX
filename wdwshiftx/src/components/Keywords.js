/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(3),
		},
		paddingBottom: '8px',
	},
}));

function Keywords(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Autocomplete
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				multiple
				id="keywords"
				name="keywords"
				options={props.keywords.map((option) => option.keyword)}
				// This is where the User Default Keywords will show up
				defaultValue={['1900 Park Fare', 'Accents']}
				freeSolo
				renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
				renderInput={(params) => <TextField {...params} variant="outlined" label="Keywords" placeholder="Roles, Locations, Etc." />}
			/>
		</div>
	);
}

export default Keywords;
