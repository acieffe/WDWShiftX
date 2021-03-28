import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { auth, provider } from '../firebase';
import Logo from './Logo';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
	container: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	links: {
		cursor: 'pointer',
		textAlign: 'center',
	},
}));

function Login(props) {
	const classes = useStyles();

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				const newUser = {
					name: result.user.displayName,
					photo: result.user.photoURL,
				};
				localStorage.setItem('user', JSON.stringify(newUser));
				props.setUser(newUser);
			})
			.catch((e) => {
				console.log(e.message);
			});
	};

	return (
		<div className={classes.container}>
			<Logo />
			<div className={classes.links} onClick={signIn}>
				<Button variant="contained" color="primary">
					Login or Register
				</Button>
			</div>
		</div>
	);
}

export default Login;
