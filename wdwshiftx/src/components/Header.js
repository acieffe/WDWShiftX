import React from 'react';
import Logo from './Logo';
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
	links: {
		padding: '0 8px',
		textAlign: 'right',
		flex: '1',
		fontSize: '1.5em',
	},
	link: {
		padding: '2px 5px 4px',
		textDecoration: 'none',
		'&:hover': {
			backgroundColor: 'orange',
		},
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
	userLoggedIn: {
		display: 'flex',
		alignItems: 'center',
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
		cursor: 'pointer',
	},
}));

function Header({ user, signOut }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.logoArea}>
				<Logo />
			</div>
			<div className={classes.links}>
				<a href="/shifts" className={classes.link}>
					Shifts
				</a>
			</div>
			<div className={classes.userContainer}>
				{!user ? (
					<div className={classes.links}>
						<a href="/login" className={classes.link}>
							Login Or Register
						</a>
					</div>
				) : (
					<div className={classes.userLoggedIn}>
						<div className={classes.userName}>Hello {user.name}</div>
						<div className={classes.userImg} onClick={signOut}>
							<img src={user.photo ? user.photo : 'https://i.imgur.com/6VBx3io.png'} alt="" width="100%" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Header;
