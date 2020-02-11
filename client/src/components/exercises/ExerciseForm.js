import React, { Fragment, useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import ExerciseContext from '../../context/exercise/exerciseContext';
import { withRouter } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

const CreateExercise = props => {
  const exerciseContext = useContext(ExerciseContext);

  const {
    addExercise,
    updateExercise,
    current,
    clearCurrent
  } = exerciseContext;

  useEffect(() => {
    if (current !== null) {
      setExercise(current);
    } else {
      setExercise({
        description: '',
        duration: '',
        date: new Date()
      });
    }
  }, [exerciseContext, current]);

  const [exercise, setExercise] = useState({
    description: '',
    duration: '',
    date: new Date()
  });

  const { description, duration, date } = exercise;

  const handleChange = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleChangeDate = date => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addExercise(exercise);
    } else {
      updateExercise(exercise);
    }
    props.history.push('/');
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Fragment>
      <h3 className='text-center p-4'>
        {current ? 'Edit Exercise Log' : 'Create New Exercise Log'}
      </h3>
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
            <DatePicker selected={date} onChange={handleChangeDate} />
          </div>
        </div>
        <div>
          <button type='submit' className='btn btn-info btn-block'>
            {current ? 'Edit' : 'Add'}
          </button>
        </div>
        {current && (
          <div>
            <button
              className='mt-3 btn btn-outline-secondary btn-block'
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default withRouter(CreateExercise);
