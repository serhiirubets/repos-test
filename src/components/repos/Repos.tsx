import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { ActionTypes, fetchRepos } from './actions';
import { connect } from 'react-redux';
import { State } from '../types';
import { Action } from 'redux';
import { ReposDTO, ReposEntity } from './dto';
import { Table, PageHeader } from 'antd';

type MyThunkDispatch = ThunkDispatch<State, undefined, Action>;

interface ReposProps {
  getRepos(): Promise<{ payload?: ReposDTO; type: ActionTypes }>;
  repos?: ReposEntity;
  totalCount?: number;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Forks amount',
    dataIndex: 'forksAmount',
    key: 'forksAmount'
  },
  {
    title: 'Star amount',
    dataIndex: 'starAmount',
    key: 'starAmount'
  }
];

const Repos = ({ getRepos, repos, totalCount }: ReposProps) => {
  useEffect(() => {
    if (getRepos) {
      getRepos();
    }
  }, [getRepos]);

  if (repos && repos.length > 0) {
    return (
      <>
        {totalCount && (
          <PageHeader title="Total amount" subTitle={totalCount} />
        )}
        <Table dataSource={repos} columns={columns} rowKey="name" />
      </>
    );
  }

  return <h2>Loading</h2>;
};

const mapStateToProps = (state: State) => ({
  repos: state.repos?.repos,
  totalCount: state.repos?.repositoryCount
});

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  getRepos: () => dispatch(fetchRepos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
