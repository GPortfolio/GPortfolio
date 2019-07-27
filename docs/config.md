# README

- [Filter](#filter)
- [Image](#image)

## Filter

Filter the data by the specified parameters. **String equal**.

### Structure:

```
{
  attr: string, // the resulting property from the object to filter
  values: any, // to compare the resulting value
  revert: boolean, // change check backwards (true -> false, false -> true)
  more: string, // extra options
}
```

Details **more** property:

- **values** property is number, accept: **>, <, >=, <=**

Interface: *node/interfaces/IFilter.ts*

### Example:

Filter the received Github repositories by these parameters:

```
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

### Example

```
'' - use default image in template (if exists)
'upstream/logo.png' - from assets folder
'https://images.unsplash.com/photo-1505685296765-3a2736de412f' - from url
```
