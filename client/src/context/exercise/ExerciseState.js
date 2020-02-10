import React, { useReducer } from 'react';
import uuid from 'uuid';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';
import { ADD_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE } from '../types';

const ExerciseState = props => {
  const initialState = {
    exercises: [
      {
        id: 1,
        description: 'running',
        duration: 30,
        date: new Date()
      },
      {
        id: 2,
        description: 'biking',
        duration: 90,
        date: new Date()
      },
      {
        id: 3,
        description: 'swimming',
        duration: 45,
        date: new Date()
      },
      {
        id: 4,
        description: 'running',
        duration: 30,
        date: new Date()
      }
    ]
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // add exercise

  // delete exercise

  // update exercise

  return (
    <ExerciseContext.Provider
      value={{
        exercises: state.exercises
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
