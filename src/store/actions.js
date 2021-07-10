import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  POST_REVIEW: `data/postReview`
};

export const postReview = createAction(ActionType.POST_REVIEW, (review) => {
  return {
    payload: review,
  };
});
