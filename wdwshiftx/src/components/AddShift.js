import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import NewShift from './NewShift';
import EventIcon from '@material-ui/icons/Event';

function getModalStyle() {
	return {
		top: `50%`,
		left: `50%`,
		transform: `translate(-50%, -50%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 'minContent',
		backgroundColor: theme.palette.background.paper,
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		'&:not(:hover)': {
			outline: 'none',
		},
		'&:hover': {
			outline: 'none',
		},
	},
	openModal: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
	},
}));

function AddShift({ keywords }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<NewShift keywords={keywords} />
		</div>
	);

	return (
		<div>
			<div className={classes.openModal} onClick={handleOpen}>
				<EventIcon />
				<span>&nbsp;Add Shift</span>
			</div>
			<Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
				{body}
			</Modal>
		</div>
	);
}

export default AddShift;
