![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo_.png?v=4&s=100)

## Create a new user

Add a user name in the profiles.json array

```json
{
  "list": [
      "profile-one"
  ]
}
```

Create the src/profiles/`profile-one` directory and define the same scafold as the already existing `my-user` directory.

Finally, import your user page in the `src/profiles/index.js` file as below:

```js
import './profile-one/profile-one-page.js';
```
