import * as actions from '../actions';
import {createReducer} from '@reduxjs/toolkit';
import {FIRST_PAYMENT_RATE, LOAN_TERM, MENU_TYPE, PRICES_DATA} from '../../const';

const initialState = {
  menuType: MENU_TYPE.SERVICES,
  purpose: ``,
  price: PRICES_DATA.START,
  firstPayment: FIRST_PAYMENT_RATE.MIN,
  loanTerm: LOAN_TERM.MIN,
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
  builder.addCase(actions.changePrice, (state, action) => {
    return {
      ...state,
      price: action.payload,
    };
  });
  builder.addCase(actions.changeFirstPayment, (state, action) => {
    return {
      ...state,
      firstPayment: action.payload,
    };
  });
  builder.addCase(actions.changeLoanTerm, (state, action) => {
    return {
      ...state,
      loanTerm: action.payload,
    };
  });
});

export {DATA};
