import Immutable from 'immutable';
import { SET_INPUT_VALUE, CLEAR_FORM_DATA } from '../constants/form';

const initialState = Immutable.Map();

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case SET_INPUT_VALUE:
            const {name, value} = action.payload;

            state = state.set(name, value);
            break;
        case CLEAR_FORM_DATA:
            state = initialState;
            break;
        default:
            break;
    }

    return state;
}