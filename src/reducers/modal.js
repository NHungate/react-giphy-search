import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  selectedGif: null,
  modalIsOpen: false
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        selectedGif: action.payload,
        modalIsOpen: true
      };
    case CLOSE_MODAL:
      return {
        ...state,
        selectedGif: null,
        modalIsOpen: false
      };
    default:
      return state;
  }
}
