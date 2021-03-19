/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

	const allWords = props.keywords.map((fart) => fart.keyword);
	console.log(allWords[0]);

	return (
		<div className={classes.root}>
			<Autocomplete
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				disableCloseOnSelect
				multiple
				id="keywords"
				name="keywords"
				options={props.keywords}
				// options={props.keywords.map((option) => option.keyword)}
				// This is where the User Default Keywords will show up
				// defaultValue={[]}
				// defaultValue={['1900 Park Fare', 'Accents']}
				getOptionLabel={(option) => option.keyword}
				renderOption={(option, { selected }) => (
					<React.Fragment>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option.title}
					</React.Fragment>
				)}
				freeSolo
				renderTags={(value, getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)}
				renderInput={(params) => <TextField {...params} variant="outlined" label="Keywords" placeholder="Roles, Locations, Etc." />}
			/>
		</div>
	);
}

export default Keywords;
