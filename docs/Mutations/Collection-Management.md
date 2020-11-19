# Collection Management

## Add Record

Mutation `addRecord` takes `data` as parameter, which should include: [Record Object](../Representation/Representation.md#record-object)

Returns:

- `token` - Authentication token
- `user` - [User Object](../Other/Jopa.md)

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
