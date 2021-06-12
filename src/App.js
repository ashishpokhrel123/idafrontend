import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import SignUpButton from './components/SignUpButton';
import PrivateRoute from './components/PrivateRoute';

import Profile from './components/Profile';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
     <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginButton} />
        <Route exact path='/register' component={SignUpButton} />
        <PrivateRoute exact path ='/profile' component={Profile} />
        </Switch>
        </BrowserRouter>
  );
}

export default App;
