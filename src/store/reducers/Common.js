// Initial State
import { InitialState } from '../InitialState';
import { CommonTypes } from '../types';

// Reducers (Modifies The State And Returns A New State)
const Common = (state = InitialState.common, action) => {
  switch (action.type) {
    case CommonTypes.LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      }
    }
  
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default Common;