import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ExerciseContext from '../../context/exercise/exerciseContext';

const ExerciseItem = ({ exercise }) => {
  // initialisation de mon context pour avoir accès aux méthodes deleteExercise et setCurrent
  const exerciseContext = useContext(ExerciseContext);
  // et destructuring sur ce même context
  const { deleteExercise, setCurrent } = exerciseContext;

  // destructure l'objet exercise, envoyé par le component ExercisesList pour avoir accès plus facilement à ses propriétés
  const { description, duration, date, id } = exercise;

  // mettre la première lettre de ma description en capitale
  const descriptionCapitalize =
    description.charAt(0).toUpperCase() + description.slice(1);

  // méthode pour supprimer un exercice, elle fait appelle elle même à la méthode deleteExercise provenant de mon context et plus précisement de ExerciseState.js
  const handleDelete = id => {
    deleteExercise(id);
  };

  const handleUpdate = exercise => {
    setCurrent(exercise);
  };
  return (
    <tr>
      <td>{descriptionCapitalize}</td>
      <td>{duration}</td>
      <td>{date.toString().substring(0, 10)}</td>
      <td>
        <Link
          to='/create'
          className='btn btn-outline-info btn-sm'
          onClick={() => handleUpdate(exercise)}
        >
          edit
        </Link>{' '}
        |{' '}
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
