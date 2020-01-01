# How to connect Dribbble

Log in and go to this page:
[https://dribbble.com/account/applications/new](https://dribbble.com/account/applications/new)

Fill in the fields:

```markdown
Name=test
Description=test
Website URL=https://example.com
Callback URL=https://dribbble.com
```

Go to the created application and copy this data to the bottom in **config.js**:

```markdown
dribbble.client_id=Client ID
dribbble.client_secret=Client Secret
```

To get the last parameter - `dribbble.code`, you need to go to this
url by inserting your `client_id`, obtained above:

```markdown
https://dribbble.com/oauth/authorize?client_id=REPLACE_YOUR_CLIENT_ID
```

The site will open with the following url, copy everything after `?code=`:

```markdown
https://dribbble.com/?code=c3a1fa87f3c0feerho34pjt23po969238cdc18638a2ab28f764ddcc434b07a22

Copy: c3a1fa87f3c0feerho34pjt23po969238cdc18638a2ab28f764ddcc434b07a22
```

Paste the value into the **config.js** file - `dribbble.code`:

Now you can run the project in dev mode `npm run dev` or prod `npm run build`

*NOTE: `dribbble.code` is valid only once when receiving a token*
