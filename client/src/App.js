import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import EditExercise from './components/exercises/EditExercise';
import CreateExercise from './components/exercises/CreateExercise';
import CreateUser from './components/users/CreateUser';
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
              <Route exact path='/edit/:id' component={EditExercise} />
              <Route exact path='/create' component={CreateExercise} />
              <Route exact path='/user' component={CreateUser} />
              <Route />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ExerciseState>
  );
}

export default App;
