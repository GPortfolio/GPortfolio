# README


-- filter

/**
  * After get repositories (API) - filter by these filters
  * Accept repository if all of the parameters is valid
  * String equal!
  * @type {{attr: string, values: *, revert: boolean, more: *}[]}
  *  more - extra options, support:
  *    If values is number - ['>', '<', '>=', '<=']
  * @see cache/repositories.json to see attributes or for API to get repositories
  * @example
  *  Get repositories where:
  *  { attr: 'name', values: ['rep2', 'rep1'], revert: false, more: '' } // 2 repositories
  *  { attr: 'language', values: 'JavaScript', revert: true, more: '' } // excluding javascript
  *  { attr: 'size', values: 200, revert: false, more: '<' } //  size is less than 200 KB
  *  { attr: 'name', values: /php/i, revert: false, more: '' } // where php is in the title
  *  { attr: 'owner.login', values: 'nickname', revert: false, more: '' } // owner is nickname
  */


-- background

/**
  * @type {string}
  * @example
  *  (empty) - use default image in template
  *  upstream/logo.png - from assets folder
  *  https://images.unsplash.com/photo-1505685296765-3a2736de412f - from url
  */
  