import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';

import ExerciseForm from './components/exercises/ExerciseForm';
import CreateUser from './components/users/CreateUser';
import About from './components/pages/About';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

import ExerciseState from './context/exercise/ExerciseState';
import './App.css';

function App() {
  return (
    <ExerciseState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/create' component={ExerciseForm} />
              <Route exact path='/user' component={CreateUser} />
              <Route exact path='/about' component={About} />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </ExerciseState>
  );
}

export default App;
