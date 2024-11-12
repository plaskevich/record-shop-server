# Record Shop Server

GraphQL server for [Record Shop](https://github.com/plaskevich/recordshop)

#### Live server can be accessed at https://recordshop-bgn8.onrender.com/graphql

### For more information, check [API Documentation](https://record-shop.stoplight.io)

## Run app locally

### 1. Install dependencies

`yarn`

### 2. Set credentials

1. In the root of the project create a file named `.env`
2. Set the `.env` file with credentials:

```
PORT = <port>
MONGO_URI = mongodb+srv://plvster:UhnYqiwwIfWlGuqf@recordshop.sg0ry.mongodb.net/recordshop
```

### 3. Start server

`yarn dev`

After this the server can be used with the link: `http://localhost:<port>/graphql`,
where <port> is the port number that is assigned in `.env` file.

To access GraphQL playground, just open that link in browser.

## How to test

### 1. Sign in

In order to test the app, sing in in the playground with `signIn` mutation, using following credentidals:

```
email: test@user.com
password: simplepass
```

### 2. Use token

Copy the returned token and then paste it in the HTTP Headers:

```
{
  "Authorization": "Bearer <token>"
}
```
