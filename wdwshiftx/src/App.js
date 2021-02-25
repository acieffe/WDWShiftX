import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Shift from './components/Shifts';
import Login from './components/Login';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/shifts">
						<Shift />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
