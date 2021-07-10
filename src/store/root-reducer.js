
import {combineReducers} from 'redux';
import {Data} from './data/data';

export const NameSpace = {
  DATA: `DATA`,
};

export default combineReducers({
  [NameSpace.DATA]: Data,
});
