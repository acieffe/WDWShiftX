import { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import db from '../firebase';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		alignItems: 'center',
		'& > * + *': {
			marginTop: theme.spacing(3),
		},
		paddingBottom: '8px',
	},
	form: {
		display: 'flex',
		width: '100%',
		border: '1px solid blue',
		borderRadius: '5px',
	},
	naked: {
		flex: '1',
		marginLeft: '8px',
		fontFamily: 'Philosopher',
		fontSize: '1.25em',
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

const filter = async (e) => {
	e.preventDefault();
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(300);
	localStorage.setItem('localKeywords', JSON.stringify(e.target.localKeywords.value));
	//'JSON.stringify(localKeywords));
};

function Keywords({ keywords }) {
	const classes = useStyles();

	// console.log(keywords[0]);

	// const userOptions = [keywords[6]];
	// const [value, setValue] = useState([...userOptions, keywords[13]]);

	return (
		<div className={classes.root}>
			<form className={classes.form} onSubmit={filter} noValidate>
				<InputBase className={classes.naked} name="localKeywords" plaaceholder="Keywords" inputProps={{ 'aria-label': 'naked' }} />
				<Button variant="contained" color="primary" type="submit">
					Filter Shifts
				</Button>
			</form>
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
				<Button variant="contained" color="primary" onClick={addKeyword}>
					Add Keyword
				</Button>
			</div>
		</div>
	);
}

export default Keywords;
