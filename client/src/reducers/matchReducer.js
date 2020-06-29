import {
  GET_MATCHS,
  ADD_MATCH,
  DELETE_MATCH,
  MATCH_ERROR,
  UPDATE_MATCH,
} from '../actions/types';

const initialState = {
  matchs: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MATCHS:
      return {
        ...state,
        matchs: payload,
        loading: false,
      };
    case ADD_MATCH:
      return {
        ...state,
        matchs: [payload, ...state.matchs],
        loading: false,
      };
    case UPDATE_MATCH:
      return {
        ...state,
        matchs: state.matchs.map((match) =>
          match._id === payload._id ? payload : match
        ),
      };
    case DELETE_MATCH:
      return {
        ...state,
        matchs: state.matchs.filter((match) => match._id !== payload),
        loading: false,
      };
    case MATCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
