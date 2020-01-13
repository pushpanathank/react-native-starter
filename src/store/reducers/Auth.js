// Initial State
import { InitialState } from '../InitialState';
import { AuthTypes } from '../types';

// Reducers (Modifies The State And Returns A New State)
const Auth = (state = InitialState.auth, action) => {
  switch (action.type) {
    case AuthTypes.RESETSTATE: {
      return InitialState.auth
    }
  
    case AuthTypes.SHOWINTRO: {
      return {
        ...state,
        showIntro: action.showIntro,
      }
    }

    case AuthTypes.LOGIN: {
      return {
        ...state,
        user: action.data.user,
        gpmem: action.data.gpmem,
        gf: action.data.gf,
      }
    }
    case AuthTypes.REGISTER: {
      return {
        ...state,
      }
    }
    case AuthTypes.LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default Auth;