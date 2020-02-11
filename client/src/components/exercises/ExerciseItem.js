import React, { useState, useEffect, useContext } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';

const ExerciseItem = ({ exercise }) => {
  const exerciseContext = useContext(ExerciseContext);

  const { description, duration, date, id } = exercise;
  const descriptionCapitalize =
    description.charAt(0).toUpperCase() + description.slice(1);

  const { deleteExercise } = exerciseContext;

  const handleDelete = id => {
    deleteExercise(id);
  };
  return (
    <tr>
      <td>{descriptionCapitalize}</td>
      <td>{duration}</td>
      <td>{date.toString().substring(0, 10)}</td>
      <td>
        <button className='btn btn-outline-info btn-sm'>edit</button> |{' '}
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={() => handleDelete(id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default ExerciseItem;
