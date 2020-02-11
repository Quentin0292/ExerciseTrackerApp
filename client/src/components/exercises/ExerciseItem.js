import React from 'react';

const ExerciseItem = ({ exercise }) => {
  const { description, duration, date } = exercise;
  const descriptionCapitalize =
    description.charAt(0).toUpperCase() + description.slice(1);
  return (
    <tr>
      <td>{descriptionCapitalize}</td>
      <td>{duration}</td>
      <td>{date.toString().substring(0, 10)}</td>
      <td>
        <button className='btn btn-outline-info btn-sm'>edit</button> |{' '}
        <button className='btn btn-outline-danger btn-sm'>delete</button>
      </td>
    </tr>
  );
};

export default ExerciseItem;
