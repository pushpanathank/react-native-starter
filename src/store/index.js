import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

import AppNavigation from "../navigation/AppNavigation";

// Imports: Redux
import * as reducers from './reducers'

const navReducer = createNavigationReducer(AppNavigation)

const rootReducers = combineReducers({
  nav: navReducer,

  // these are your reducers for your components
  ...reducers,
})

const App = createReduxContainer(AppNavigation, 'root');

// Middleware: Redux Thunk (Async/Await)
const middleware = [thunk];

// Redux Helper
const reduxHelper = createReactNavigationReduxMiddleware(
	navStateSelector => 'root',
	state => state.nav,
);
middleware.push(reduxHelper);

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'Auth'
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [
  ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
  App,
  store,
  persistor,
};