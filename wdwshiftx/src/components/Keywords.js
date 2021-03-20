import React, { useState, useEffect } from 'react';
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

function Keywords() {
	const classes = useStyles();
	const [keywords, setKeywords] = useState([]);

	const getKeywords = () => {
		db.collection('keywords')
			.orderBy('slug', 'asc')
			.onSnapshot((snapshot) => {
				setKeywords(
					snapshot.docs.map((doc) => {
						return {
							keyword: doc.data().keyword,
							slug: doc.data().slug,
						};
					})
				);
			});
	};

	useEffect(() => {
		getKeywords();
	}, []);

	console.log(keywords[0]);

	const userOptions = [keywords[6]];
	const [value, setValue] = React.useState([...userOptions, keywords[13]]);

	return (
		<div className={classes.root}>
			Hi
			<Autocomplete
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
			/>
		</div>
	);
}

export default Keywords;
