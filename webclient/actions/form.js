import { SET_INPUT_VALUE, CLEAR_FORM_DATA } from '../constants/form';

export const setInputValue = ({ name, value }) => ({
    type: SET_INPUT_VALUE,
    payload: { name, value }
});

export const clearFormData = () => ({ type: CLEAR_FORM_DATA });