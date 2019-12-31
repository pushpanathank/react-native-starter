import { AuthTypes } from '../types';

export const Login = payloads => dispatch => {
	return dispatch({ type: AuthTypes.LOGIN, user: payloads.user });

}

export const Logout = () => dispatch => {
  return dispatch({ type: AuthTypes.LOGOUT });
  
}