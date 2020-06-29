import { SET_USER_STATUS, SET_USERID } from '../actions/types';

const initialState = {
  userId: '',
  userLoggedIn: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_STATUS:
      return { ...state, userLoggedIn: payload };
    case SET_USERID:
      return { ...state, userId: payload };
    default:
      return state;
  }
}
