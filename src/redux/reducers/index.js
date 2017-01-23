import {APP_TEST} from '../actions/types';

export default function reducer(state = {}, action) {
	const {type = {}, payload} = action;

	switch (type) {
		case APP_TEST: {
			return {...state, test: payload};
		}
		default: {
			return state;
		}
	}
}
