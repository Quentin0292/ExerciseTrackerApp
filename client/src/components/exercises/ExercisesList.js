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
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exercisesList()}</tbody>
      </table>
    </Fragment>
  );
};

export default ExercisesList;
