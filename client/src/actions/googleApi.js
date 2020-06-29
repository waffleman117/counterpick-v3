import { SET_USER_STATUS, SET_USERID } from '../actions/types';

//establecer estatus del usuario, logeado, null, o deslogeado
export const setUserStatus = (loginStatus) => {
  return { type: SET_USER_STATUS, payload: loginStatus };
};

export const setUserId = (id) => {
  return { type: SET_USERID, payload: id };
};
