import {createStore} from 'redux';
import reducer from './reducers';

export function configureStore(state = {}) {
	if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
		return createStore(reducer, state, window.__REDUX_DEVTOOLS_EXTENSION__());
	}
	return createStore(reducer, state);
}
