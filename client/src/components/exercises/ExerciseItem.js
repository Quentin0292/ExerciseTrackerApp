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
        <button>edit</button> | <button>delete</button>
      </td>
    </tr>
  );
};

export default ExerciseItem;
