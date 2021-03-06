import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shifts from './components/Shifts';
import Header from './components/Header';
import Ads from './components/Ads';
import Landing from './components/Landing';
import Login from './components/Login';
import { auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Philosopher', 'sans-serif'].join(','),
	},
});

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	body: {
		display: 'grid',
		gridTemplateRows: '38px auto',
	},
	main: {
		margin: '50px auto 100px',
	},
	adsContainer: {
		position: 'fixed',
		bottom: '0px',
		width: '100%',
		backgroundColor: 'pink',
		boxShadow: '0px -2px 5px',
		zIndex: '50',
	},
}));

function App() {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const signOut = () => {
		auth.signOut().then(() => {
			localStorage.removeItem('user');
			localStorage.removeItem('localKeywords');
			setUser(null);
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.root}>
				<Router>
					<div className={classes.body}>
						<Header signOut={signOut} user={user} />
						<Container className={classes.main} maxWidth="sm">
							{!user ? (
								<Login setUser={setUser} />
							) : (
								<Switch>
									<Route path="/shifts">
										<Shifts />
									</Route>
									<Route path="/">
										<Landing />
									</Route>
								</Switch>
							)}
						</Container>
					</div>
					<div className={classes.adsContainer}>
						<Ads />
					</div>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
