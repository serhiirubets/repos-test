interface Forks {
  totalCount: number;
}

interface Stargazers {
  totalCount: number;
}

interface RepoDTO {
  forks: Forks;
  stargazers: Stargazers;
  name: string;
}

interface Repo {
  forksAmount: number;
  starAmount: number;
  name: string;
}

export type ReposEntity = Array<Repo>;

type Edges = ReadonlyArray<{ node: RepoDTO }>;

export interface SearchReposResponse {
  data: {
    search: {
      edges: Edges;
      repositoryCount: number;
    };
  };
}

export interface ReposDTO {
  repositoryCount: number;
  repos: ReposEntity;
}

export const prepareRepos = (data: SearchReposResponse): ReposDTO => {
  return {
    repositoryCount: data.data.search.repositoryCount,
    repos: data.data.search.edges.map(({ node }) => ({
      name: node.name,
      starAmount: node.stargazers.totalCount,
      forksAmount: node.forks.totalCount
    }))
  };
};
