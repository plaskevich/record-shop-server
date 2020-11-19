# Authorization
## Sign Up
 
Mutation `signUp` takes parameters:

- `email`: String
- `password`: String
- `name`: String

Returns:

- `token` - Authentication token
- `user` - [User](../Representation/Objects.md#user)

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
- `user` - [User Object](../Representation/Objects.md#user-object)

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