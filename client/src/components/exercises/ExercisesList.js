import React, { Fragment, useContext } from 'react';
import ExerciseItem from './ExerciseItem';

import ExerciseContext from '../../context/exercise/exerciseContext';

const ExercisesList = () => {
  const exerciseContext = useContext(ExerciseContext);
  const { exercises } = exerciseContext;

  const exercisesList = () => {
    // console.log('hello from exercisesList ');
    return exercises.map(exercise => {
      return <ExerciseItem key={exercise.id} exercise={exercise} />;
    });
  };

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
          <tbody>{exercisesList()}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ExercisesList;
