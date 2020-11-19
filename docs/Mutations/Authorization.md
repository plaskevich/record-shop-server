# Authorization
## Sign Up
 
Mutation `signUp` takes parameters:

- `email`: String
- `password`: String
- `name`: String

Returns:

- `token` - Authentication token
- `user` - [User Object](https://record-shop.stoplight.io/docs/record-shop-server/docs/Mutations/Authorization.md#sign-up)

#### Example

```graphql
mutation {
  signUp(email: "max@example.mail",
    password: "securePassword",
    name: "Max"){
    token
    user{
      id
      email
      name
      shop
    }
  }
}
```
## Login
 
Mutation `login` takes parameters:

- `email`: String
- `password`: String

Returns:

- `token` - Authentication token
- `user` - User Object

#### Example

```graphql
mutation {
  login(email: "max@example.mail",
    password: "securePassword"){
    token
    user{
      id
      email
      name
      shop
    }
  }
}
```