import React, { Fragment, useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import ExerciseContext from '../../context/exercise/exerciseContext';
import { withRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = props => {
  const exerciseContext = useContext(ExerciseContext);

  const { addExercise } = exerciseContext;

  useEffect(() => {
    setExercise({
      description: '',
      duration: 0,
      date: new Date()
    });
  }, [exerciseContext]);

  const [exercise, setExercise] = useState({
    description: '',
    duration: 0,
    date: new Date()
  });

  const { description, duration, date } = exercise;

  const onSubmit = e => {
    e.preventDefault();
    addExercise(exercise);
    props.history.push('/');
  };

  const handleChange = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='description'>Description: </label>
          <input
            type='text'
            required
            name='description'
            value={description}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='duration'>Duration: </label>
          <input
            type='text'
            required
            name='duration'
            value={duration}
            className='form-control'
            onChange={handleChange}
          />
          <small>in minutes</small>
        </div>
        <div className='form-group'>
          <label htmlFor='date'>Date:</label>
          <div>
            <DatePicker name='date' selected={date} onChange={handleChange} />
          </div>
        </div>
        <button type='submit' className='btn btn-primary btn-block'>
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default withRouter(CreateExercise);
