import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shift from './components/Shifts';
import NewShift from './components/NewShift';
import Header from './components/Header';
import styled from 'styled-components';
import Ads from './components/Ads';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import db from './firebase';

function App() {
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

	const [keywords, setKeywords] = useState([]);

	const getKeywords = () => {
		db.collection('keywords')
			.orderBy('slug', 'asc')
			.onSnapshot((snapshot) => {
				setKeywords(
					snapshot.docs.map((doc) => {
						return {
							keyword: doc.data().keyword,
						};
					})
				);
			});
	};

	useEffect(() => {
		getShifts();
		getKeywords();
	}, []);

	return (
		<div className="App">
			<Router>
				<Container>
					<Header />
					<Main>
						<Switch>
							<Route path="/shifts">
								<Shift shifts={shifts} keywords={keywords} />
							</Route>
							<Route path="/newshift">
								<NewShift />
							</Route>
							<Route path="/signup">
								<SignUp />
							</Route>
							<Route path="/signin">
								<SignIn />
							</Route>
							<Route path="/">
								<Landing />
							</Route>
						</Switch>
					</Main>
				</Container>
				<AdsContainer>
					<Ads />
				</AdsContainer>
			</Router>
		</div>
	);
}

export default App;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 38px auto;
`;

const Main = styled.div`
	margin: 0 auto;
`;

const AdsContainer = styled.div`
	width: 100%;
	background-color: pink;
	box-shadow: 0px -2px 5px;
	position: fixed;
	bottom: 0px;
	z-index: 50;
`;
