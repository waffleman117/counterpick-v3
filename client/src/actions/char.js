import api from '../utils/api';
import { GET_CHAR, GET_CHARS, ADD_CHAR, CHAR_ERROR } from './types';

//get all chars
export const fetchChars = () => async (dispatch) => {
  try {
    const res = await api.get('/chars?_sort=nombre');

    dispatch({
      type: GET_CHARS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//get char by id
export const fetchCharById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/chars/${id}`);

    dispatch({
      type: GET_CHAR,
      payload: res.data,
    });
    dispatch(fetchChars());
  } catch (err) {
    dispatch({
      type: CHAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//post char
export const requestCharPost = (charObj) => async (dispatch) => {
  try {
    const res = await api.post('/chars', charObj);
    dispatch({
      type: ADD_CHAR,
      payload: res.data,
    });
    dispatch(fetchChars());
    //dispatch(setAlert('Char Created', 'success'));
  } catch (err) {
    dispatch({
      type: CHAR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
