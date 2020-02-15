import {
  ADD_EXERCISE,
  UPDATE_EXERCISE,
  DELETE_EXERCISE,
  SET_CURRENT,
  CLEAR_CURRENT,
  GET_EXERCISES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [action.payload, ...state.exercises],
        loading: false
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map(exercise =>
          // if contact match with the contact in the payload,
          // i replace the contact with the new value
          // else i just return the contact original
          exercise.id === action.payload.id ? action.payload : exercise
        ),
        loading: false
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
