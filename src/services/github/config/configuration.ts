import IGithubConfiguration from '../interfaces/IGithubConfiguration';

export default {
  nickname: '',
  fetcher: {
    repositories: {
      type: 'owner',
      sort: 'full_name',
      direction: 'asc',
      visibility: 'public',
      affiliation: ['owner', 'collaborator', 'organization_member'],
    },
  },
  filter: {
    repositories: [[]],
  },
  sort: {
    repositories: [],
  },
} as IGithubConfiguration;
