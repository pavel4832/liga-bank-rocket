import * as actions from '../actions';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isData: true,
};

const Data = createReducer(initialState, (builder) => {
  builder.addCase(actions.postReview, (state) => {
    return {
      ...state,
    };
  });
});

export {Data};
