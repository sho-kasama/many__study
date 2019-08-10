const request = axios.create({
  baseURL: 'https://api.github.com'
})

request.get('/users/sho-kasama') // /users/:usernameでGETメソッドでリクエストを行います
  .then(res => res.data)
  .then(console.log)