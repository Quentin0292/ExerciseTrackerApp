import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import ExerciseForm from './components/exercises/ExerciseForm';
import About from './components/pages/About';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

import ExerciseState from './context/exercise/ExerciseState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  console.log('yes token');
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <ExerciseState>
      <AuthState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/create' component={ExerciseForm} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
                <Footer />
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AuthState>
    </ExerciseState>
  );
};

export default App;
