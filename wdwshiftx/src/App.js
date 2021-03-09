import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shift from './components/Shifts';
import NewShift from './components/NewShift';
import Header from './components/Header';
import styled from 'styled-components';
import Ads from './components/Ads';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
	return (
		<div className="App">
			<Router>
				<Container>
					<Header />
					<Main>
						<Switch>
							<Route path="/shifts">
								<Shift />
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
