import { ADD_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise.id !== action.payload
        )
      };

    default:
      return;
  }
};
