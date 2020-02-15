import React, { Fragment, useContext, useEffect } from 'react';
import ExerciseItem from './ExerciseItem';

import ExerciseContext from '../../context/exercise/exerciseContext';

const ExercisesList = () => {
  const exerciseContext = useContext(ExerciseContext);
  const { exercises, getExercises, loading } = exerciseContext;

  useEffect(() => {
    getExercises();
    // eslint-disable-next-line
  }, []);

  const exercisesList = () => {
    // console.log('hello from exercisesList ');
    return exercises.map(exercise => {
      return <ExerciseItem key={exercise._id} exercise={exercise} />;
    });
  };

  if (exercises !== null && exercises.length === 0 && !loading) {
    return <h3 className='text-center p-4'>Please add a exercise</h3>;
  }

  return (
    <Fragment>
      <h3 className='text-center p-4'>Logged Exercises</h3>
      <div className='table-responsive-sm'>
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises !== null && !loading ? exercisesList() : null}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ExercisesList;
