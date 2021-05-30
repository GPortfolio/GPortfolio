# README

- [Data](#data)
- [Filter](#filter)
- [Image](#image)

## Data

All user data is in the `config.data` object. Each **attribute** accepts the **specified type** or **function**, in which all modules are transferred to take data from social networks.

### Example

Via the **function**, we receive data from **Github**, if the value is empty, then we get from **Dribbble** (if any).

```ts
name: (modules: any) => {
  let val = getDeepByKey(modules, ['github', 'profile', 'name']);

  if (!val) {
    val = getDeepByKey(modules, ['dribbble', 'profile', 'name']);
  }

  return val;
}
```

If you need to specify a **custom name**, then you need to **remove the function** and **replace it with a regular value** (in this case, it is a string type)

```ts
name: 'My name'
```

### How to find out what data I can take

In the `./core/modules/index.ts` file, the properties that are available in the **modules** variable are specified.

```ts
{
  github: {
    profile: IGithubProfile,
    repositories: IGithubRepository[],
  },
  dribbble: {
    profile: IDribbbleProfile,
    shots: IDribbbleShot[],
  },
}
```

Etc.

## Filter

Filter the data by the specified parameters. **String equal**.

### Structure

```ts
{
  attr: string, // the resulting property from the object to filter
  values: any, // to compare the resulting value
  revert: boolean, // change check backwards (true -> false, false -> true)
  more: string, // extra options
}
```

Details **more** property:

- **values** property is number, accept: **>, <, >=, <=**

Interface: *core/interfaces/IFilter.ts*

### Filter example

Filter the received Github repositories by these parameters:

```ts
[
  // Get only 2 repositories
  { attr: 'name', values: ['rep2', 'rep1'], revert: false, more: '' }

  // Excluding javascript
  { attr: 'language', values: 'JavaScript', revert: true, more: '' }

  // Size is less than 200 KB
  { attr: 'size', values: 200, revert: false, more: '<' }

  // Where "php" is in the title
  { attr: 'name', values: /php/i, revert: false, more: '' }

  // Owner login - nickname
  { attr: 'owner.login', values: 'nickname', revert: false, more: '' }
]
```

## Image

Insert image to the site.

### Image example

```ts
'' - use default image in template (if exists)
'/foo/bar.png' - from public folder
'https://images.unsplash.com/photo-1505685296765-3a2736de412f' - from url
```
