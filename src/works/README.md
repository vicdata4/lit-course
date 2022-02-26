![](https://cdn.jsdelivr.net/gh/vicdata4/lit-course/assets/images/logo_.png?v=4&s=100)

## Create a new user

Add a user name in the users.json array

```json
{
  "list": [
      "your-user"
  ]
}
```

Create the src/works/`your-user` directory and define the same scafold as the already existing `my-user` directory.

Finally, import your user page in the `src/works/index.js` file as below:

```js
import './your-user/your-user-page.js';
```
