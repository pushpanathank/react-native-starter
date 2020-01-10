import { LocationTypes } from '../types';
import { AppCons } from '../../constants';
import Api from '../../utils/Api';

export const ViewLocation = payloads => dispatch => {
	// dispatch({ type: ActionTypes.LOADING, isLoading: true });
	return Api.post(AppCons.getLocByDate,  {payloads: payloads})
		.then(res => {
	    //console.log("res", res.data);
	    // dispatch({ type: ActionTypes.LOADING, isLoading: false });
	      if(res.status == 200){
	        if(res.data.status==200){
	          dispatch({ type: LocationTypes.VIEWLOCATION, loc: res.data.data });
	        }
	        return res.data
	      } else {
	        return res
	      }
    });

}
