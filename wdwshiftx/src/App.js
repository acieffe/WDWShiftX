import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shifts from './components/Shifts';
import Header from './components/Header';
import Ads from './components/Ads';
import Landing from './components/Landing';
import Login from './components/Login';
import db, { auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserName from './components/UserName';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: '100vh',
	},
	body: {
		display: 'grid',
		gridTemplateRows: '38px auto',
	},
	main: {},
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
	const [shifts, setShifts] = useState([]);
	const [keywords, setKeywords] = useState([]);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const getShifts = () => {
		db.collection('shifts')
			.orderBy('start', 'asc')
			.onSnapshot((snapshot) => {
				setShifts(
					snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							shiftName: doc.data().shiftName,
							start: new Date(doc.data().start * 1000),
							end: new Date(doc.data().end * 1000),
							user: doc.data().user,
							comments: doc.data().comments,
							keywords: doc.data().keywords,
						};
					})
				);
			});
	};

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

	const signOut = () => {
		auth.signOut().then(() => {
			localStorage.removeItem('user');
			setUser(null);
		});
	};

	useEffect(() => {
		getShifts();
		getKeywords();
	}, []);

	return (
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
									<Shifts shifts={shifts} keywords={keywords} />
								</Route>
								<Route path="/username">
									<UserName />
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
	);
}

export default App;
