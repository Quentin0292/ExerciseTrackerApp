import {
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../types';

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
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map(exercise =>
          // if contact match with the contact in the payload,
          // i replace the contact with the new value
          // else i just return the contact original
          exercise.id === action.payload.id ? action.payload : exercise
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    default:
      return;
  }
};
