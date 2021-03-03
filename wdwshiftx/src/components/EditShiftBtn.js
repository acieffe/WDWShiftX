import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditShift from './EditShift';
import EditIcon from '@material-ui/icons/Edit';

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
		width: 450,
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
	edit: {
		fontSize: 'large',
		color: 'rgba(0,0,0,0.25)',
		'&:hover': {
			color: 'black',
		},
	},
	openModal: {
		display: 'flex',
		cursor: 'pointer',
		alignItems: 'center',
	},
}));

export default function SimpleModal() {
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
			<EditShift />
		</div>
	);

	return (
		<div>
			<EditIcon
				className={classes.edit}
				onClick={(event) => {
					event.stopPropagation();
					setOpen(true);
				}}
			/>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				{body}
			</Modal>
		</div>
	);
}
