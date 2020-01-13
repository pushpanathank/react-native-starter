import { AuthTypes, CommonTypes } from '../types';
import { AppCons } from '../../constants';
import Api from '../../utils/Api';

export const LoginWithGoogle = payloads => dispatch => {
	console.log("payloads", payloads);
	dispatch({ type: CommonTypes.LOADING, isLoading: true });
	return Api.post(AppCons.loginWithGoogle,  {payloads: payloads})
		.then(res => {
	    // console.log("res", res.data);
	    dispatch({ type: CommonTypes.LOADING, isLoading: false });
	      if(res.status == 200){
	        if(res.data.status==200){
	          dispatch({ type: AuthTypes.LOGIN, data: res.data.data });
	        }
		    return res.data;
	      } else {
	        return res
	      }
    });

}

export const Logout = () => dispatch => {
  return dispatch({ type: AuthTypes.LOGOUT });
  
}