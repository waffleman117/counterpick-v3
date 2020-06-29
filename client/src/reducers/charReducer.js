import { GET_CHAR, GET_CHARS, ADD_CHAR, CHAR_ERROR } from '../actions/types';

const initialState = {
  char: null,
  chars: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHARS:
      return {
        ...state,
        chars: payload,
        loading: false,
      };
    case GET_CHAR:
      return {
        ...state,
        char: payload,
        loading: false,
      };
    case ADD_CHAR:
      return {
        ...state,
        chars: [payload, ...state.chars],
        loading: false,
      };
    case CHAR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
