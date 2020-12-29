import { ActionTypes } from './actions';
import { State } from '../types';

export const repos = (state: State = {}, action: any) => {
  if (action.type === ActionTypes.GET_REPOS_SUCCESS) {
    return action.payload;
  }

  return state;
};
