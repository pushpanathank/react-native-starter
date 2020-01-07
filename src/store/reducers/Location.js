// Initial State
import { InitialState } from '../InitialState';
import { LocationTypes } from '../types';

// Reducers (Modifies The State And Returns A New State)
const Location = (state = InitialState.location, action) => {
  switch (action.type) {
    case LocationTypes.VIEWLOCATION: {
      return {
        ...state,
        view: action.loc,
      }
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default Location;