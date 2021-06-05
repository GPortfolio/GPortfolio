/**
 * @see
 * Public: https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user
 * Private: https://docs.github.com/en/rest/reference/repos#list-repositories-for-the-authenticated-user
 */
export default interface IGithubConfigRepository {
  type: 'all' | 'owner' | 'public' | 'private' | 'member'
  sort: 'created' | 'updated' | 'pushed' | 'full_name'
  direction: 'asc' | 'desc'
  visibility: 'all' | 'public' | 'internal' | 'private'
  affiliation: ('owner' | 'collaborator' | 'organization_member')[]
}
