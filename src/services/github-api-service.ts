import { CONFIG } from '../config';
import {SearchReposResponse} from "../components/repos/dto";

const prepareQuery = (query: string, stars: number, first: number): string => `
  query {
    search(query: "language:${query} stars:>${stars}", type: REPOSITORY, first: ${first}) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
    }
  }
`;

interface GitService {
  getAll(query: string, stars: number, first: number): Promise<SearchReposResponse>;
}

class GithubApiService implements GitService {
  constructor(private url: string) {}
  getAll(query: string, stars: number, first: number) {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.GITHUB.TOKEN}`
      },
      body: JSON.stringify({ query: prepareQuery(query, stars, first) })
    };

    return fetch(this.url, opts).then((res) => res.json());
  }
}

export default new GithubApiService(CONFIG.GITHUB.API_KEY);
