import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  CHANGE_MENU: `data/changeMenu`,
  CHANGE_PURPOSE: `data/changePurpose`,
  CHANGE_PRICE: `data/changePrice`,
  CHANGE_FIRST_PAYMENT: `data/changeFirstPayment`,
  CHANGE_LOAN_TERM: `data/changeLoanTerm`,
};

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

export const changeMenu = createAction(ActionType.CHANGE_MENU, (newMenu) => {
  return {
    payload: newMenu,
  };
});

export const changePurpose = createAction(ActionType.CHANGE_PURPOSE, (newPurpose) => {
  return {
    payload: newPurpose,
  };
});

export const changePrice = createAction(ActionType.CHANGE_PRICE, (newPrice) => {
  return {
    payload: newPrice,
  };
});

export const changeFirstPayment = createAction(ActionType.CHANGE_FIRST_PAYMENT, (newFirstPayment) => {
  return {
    payload: newFirstPayment,
  };
});

export const changeLoanTerm = createAction(ActionType.CHANGE_LOAN_TERM, (newLoanTerm) => {
  return {
    payload: newLoanTerm,
  };
});
