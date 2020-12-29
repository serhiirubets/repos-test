const API_URL = "https://api.github.com/graphql";

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
`

class GithubApiService {
  constructor(private url: string) {
  }
  getAll(query: string, stars: number, first: number) {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer 305fa662a07174222d150db81cc345377add5876" },
      body: JSON.stringify({ query: prepareQuery(query, stars, first) })
    };

    return fetch(this.url, opts)
      .then((res) => res.json())
  }
}

export default new GithubApiService(API_URL);