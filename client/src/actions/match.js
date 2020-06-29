import api from '../utils/api';
import {
  GET_MATCHS,
  ADD_MATCH,
  DELETE_MATCH,
  MATCH_ERROR,
  UPDATE_MATCH,
} from './types';

//Get all matchs
export const fetchMatchList = () => async (dispatch) => {
  try {
    const res = await api.get('/matchs');
    dispatch({
      type: GET_MATCHS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};
//delete match
export const deleteMatch = (id) => async (dispatch) => {
  try {
    //debugger;
    const response = await api.delete(`/matchs/${id}`);
    dispatch(fetchMatchList());
  } catch (err) {
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};
//Add Match
export const addMatch = (matchObj) => async (dispatch) => {
  try {
    const res = await api.post(`/matchs`, matchObj);

    dispatch({
      type: ADD_MATCH,
      payload: res.data,
    });
    dispatch(fetchMatchList());
    //dispatch(setAlert('Match Created', 'success'));
  } catch (err) {
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.res.statusText, status: err.res.status },
    });
  }
};

//update Match
export const updateMatch = (matchObj) => async (dispatch) => {
  try {
    const res = await api.put(`/matchs/${matchObj._id}`, matchObj);
    dispatch({
      type: UPDATE_MATCH,
      payload: res.data,
    });
    dispatch(fetchMatchList());
  } catch (err) {
    dispatch({
      type: MATCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
