import React from 'react';
import Logo from './Logo';
import Login from './Login';
import Register from './Register';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		position: 'fixed',
		top: '0px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'grey',
		boxShadow: '0px 2px 5px',
		zIndex: '40',
	},
	logoArea: {
		marginLeft: '5px',
	},
	userContainer: {
		display: 'flex',
		alignItems: 'center',
		paddingRight: '16px',
	},
	loginPrompt: {
		display: 'flex',
		paddingRight: '16px',
	},
	userName: {
		display: 'flex',
		paddingRight: '16px',
	},
	userImg: {
		width: '28px',
		height: '28px',
		border: '2px solid white',
		borderRadius: '3px',
	},
}));

function Header() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.logoArea}>
				<Logo />
			</div>
			<div className={classes.userContainer}>
				{true ? (
					<div className={classes.loginPrompt}>
						<Login />
						&nbsp;
						<Register />
					</div>
				) : (
					<div className={classes.userName}>Hello User</div>
				)}
				<div className={classes.userImg}>
					<img src="https://i.imgur.com/6VBx3io.png" alt="" width="100%" />
				</div>
			</div>
		</div>
	);
}

export default Header;
