import { Dispatch } from 'redux';
import { prepareRepos, ReposDTO, SearchReposResponse } from './dto';
import githubService from '../../services/github-api-service';
import { CONFIG } from '../../config';

export enum ActionTypes {
  GET_REPOS = 'Get repos',
  GET_REPOS_SUCCESS = 'GET repos success',
  GET_REPOS_FAILURE = 'GET repos failure'
}

const getRepos = () => {
  return {
    type: ActionTypes.GET_REPOS
  };
};

const getReposSuccess = (repos: ReposDTO) => {
  return {
    type: ActionTypes.GET_REPOS_SUCCESS,
    payload: repos
  };
};

const getReposFailure = () => {
  return {
    type: ActionTypes.GET_REPOS_FAILURE
  };
};

export const fetchRepos = () => (dispatch: Dispatch) => {
  dispatch(getRepos());

  return githubService
    .getAll('React', CONFIG.FILTERS.MIN_STARTS, CONFIG.FILTERS.FIRST)
    .then((repos: SearchReposResponse) =>
      dispatch(getReposSuccess(prepareRepos(repos)))
    )
    .catch(() => dispatch(getReposFailure()));
};
