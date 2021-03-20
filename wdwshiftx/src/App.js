import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shifts from './components/Shifts';
import Header from './components/Header';
import Ads from './components/Ads';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import db from './firebase';
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

	useEffect(() => {
		getShifts();
	}, []);

	return (
		<div className={classes.root}>
			<Router>
				<div className={classes.body}>
					<Header />
					<Container className={classes.main} maxWidth="sm">
						<Switch>
							<Route path="/shifts">
								<Shifts shifts={shifts} />
							</Route>
							<Route path="/signup">
								<SignUp />
							</Route>
							<Route path="/signin">
								<SignIn />
							</Route>
							<Route path="/username">
								<UserName />
							</Route>
							<Route path="/">
								<Landing />
							</Route>
						</Switch>
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
