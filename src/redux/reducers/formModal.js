import { INITIAL_STATE } from '../../common/app-const';
import {
  OPEN_FORM_MODAL,
  CLOSE_FORM_MODAL,
  TOGGLE_FORM_MODAL,
  CREATE_TODO,
  EDIT_TODO
} from '../actions/types';

const formModal = (state = INITIAL_STATE.formModal, action) => {
  switch (action.type) {
    case CREATE_TODO: {
      return { ...state, isOpen: true };
    }
    case CLOSE_FORM_MODAL: {
      return { ...state, isOpen: false };
    }
    case EDIT_TODO: {
      return { ...state, isOpen: true, isCreateForm: false };
    }
    default: {
      return state;
    }
  }
};

export default formModal;
