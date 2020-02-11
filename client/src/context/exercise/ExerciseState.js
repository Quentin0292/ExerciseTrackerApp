import React, { useReducer } from 'react';
import uuid from 'uuid';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';
import {
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../types';

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
    ],
    current: null
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // add exercise
  const addExercise = exercise => {
    exercise.id = uuid.v4();
    dispatch({
      type: ADD_EXERCISE,
      payload: exercise
    });
  };

  // delete exercise
  const deleteExercise = id => {
    dispatch({
      type: DELETE_EXERCISE,
      payload: id
    });
  };

  // update exercise
  const updateExercise = exercise => {
    dispatch({
      type: UPDATE_EXERCISE,
      payload: exercise
    });
  };

  // set current
  const setCurrent = exercise => {
    dispatch({
      type: SET_CURRENT,
      payload: exercise
    });
  };

  // clear current
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises: state.exercises,
        current: state.current,
        addExercise,
        deleteExercise,
        updateExercise,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
