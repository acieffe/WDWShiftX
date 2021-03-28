import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import db from '../firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(3),
		},
		paddingBottom: '8px',
	},
}));

const addKeyword = () => {
	const promptName = prompt('Enter New Keyword');
	if (promptName) {
		db.collection('keywords').add({
			keyword: promptName,
			slug: promptName.toLowerCase(),
		});
	}
};

function Keywords({ keywords }) {
	const classes = useStyles();

	//console.log(keywords[0]);

	const userOptions = [keywords[6]];
	const [value, setValue] = React.useState([...userOptions, keywords[13]]);

	return (
		<div className={classes.root}>
			HI
			{/* <Autocomplete
				multiple
				id="fixed-tags-demo"
				value={value}
				onChange={(event, newValue) => {
					setValue([...newValue]);
				}}
				options={keywords}
				getOptionLabel={(option) => option.keyword}
				freeSolo
				renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => <Chip label={option.keyword} {...getTagProps({ index })} />)}
				renderInput={(params) => <TextField {...params} variant="outlined" label="Keywords" placeholder="Roles, Locations, Etc." />}
			/> */}
			<div className={classes.addKeyword}>
				<button onClick={addKeyword}>Add Keyword</button>
			</div>
		</div>
	);
}

export default Keywords;
