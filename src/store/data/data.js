import * as actions from '../actions';
import {createReducer} from '@reduxjs/toolkit';
import {MENU_TYPE} from '../../const';

const initialState = {
  menuType: MENU_TYPE.SERVICES,
  purpose: ``,
};

const DATA = createReducer(initialState, (builder) => {
  builder.addCase(actions.changeMenu, (state, action) => {
    return {
      ...state,
      menuType: action.payload,
    };
  });
  builder.addCase(actions.changePurpose, (state, action) => {
    return {
      ...state,
      purpose: action.payload,
    };
  });
});

export {DATA};
