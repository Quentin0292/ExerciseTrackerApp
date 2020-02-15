import React, { useReducer } from 'react';
import axios from 'axios';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';
import {
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  SET_CURRENT,
  EXERCISE_ERROR,
  GET_EXERCISES,
  CLEAR_CURRENT
} from '../types';

const ExerciseState = props => {
  const initialState = {
    exercises: [],
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // get exercises
  const getExercises = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exercises');
      dispatch({
        type: GET_EXERCISES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // add exercise
  const addExercise = async exercise => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/exercises',
        exercise,
        config
      );
      dispatch({
        type: ADD_EXERCISE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // delete exercise
  const deleteExercise = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/exercises/${id}`);
      dispatch({
        type: DELETE_EXERCISE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
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
        getExercises,
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
