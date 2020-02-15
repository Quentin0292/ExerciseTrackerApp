import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ExerciseContext from '../../context/exercise/exerciseContext';

const CreateExercise = props => {
  const exerciseContext = useContext(ExerciseContext);

  const {
    addExercise,
    updateExercise,
    current,
    clearCurrent
  } = exerciseContext;

  // à l'initialisation du component, je met à jours le state, soit avec l'exercise courrant (choisi pour être modifier) OU avec le state initial pour créer un exercise
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

  // initialisation du state exercise et de sa méthode pour le mettre à jour
  const [exercise, setExercise] = useState({
    description: '',
    duration: '',
    date: new Date()
  });

  // destructuring du state
  const { description, duration } = exercise;

  // à chaque modification des inputs je met à jour le state, avec la nouvelle valeur
  const handleChange = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  // à la soumission du formulaire, j'ajoute l'exercise si current est null, à l'inverse si current existe cela veut dire qu'on est dans une logique d'update, je met donc à jour l'exercise
  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addExercise(exercise);
    } else {
      updateExercise(exercise);
    }
    clearAll();
    // et je renvoie l'utilisateur sur la page principale
    props.history.push('/');
  };

  const clearAll = () => {
    clearCurrent();
  };

  const titleEdit = () => {
    return (
      <h1 className='text-center p-4'>
        Edit <span className='text-info'>Exercise</span>
      </h1>
    );
  };

  const titleCreate = () => {
    return (
      <h1 className='text-center p-4'>
        Create New <span className='text-info'>Exercise</span> Log
      </h1>
    );
  };

  return (
    <div className='form-container'>
      {current ? titleEdit() : titleCreate()}
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
        {/* <div className='form-group'>
          <label htmlFor='date'>Date:</label>
          <div>
            <DatePicker selected={date} onChange={handleChangeDate} />
          </div>
        </div> */}
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
    </div>
  );
};

export default withRouter(CreateExercise);
