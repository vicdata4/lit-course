<img src="https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo-md.png" width="100"/>

## Create a new profile

Add a profile name in the profiles.json array

```json
{
  "list": [
      "profile-two"
  ]
}
```

Create the src/profiles/`profile-two` directory and define the same scafold as the already existing `/profile-one` directory.

Finally, import your user page in the `src/profiles/index.js` file as below:

```js
import './profile-two/profile-two-page.js';
```
