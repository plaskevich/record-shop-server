# Record Shop Server

GraphQL server for [Record Shop](https://github.com/plaskevich/record-shop)

#### Live server can be accessed at https://record-shop-server.herokuapp.com/

### For more information, check [API Documentation](https://record-shop.stoplight.io)

## Run app locally
### 1. Install dependencies
`npm i`
### 2. Set credentials
1. In the root of the project create a file named `.env`
2. Set the `.env` file with credentials:
```
PORT = <port>
MONGO_URI = <link to mongodb>
```
### 3. Start server
`npm start`

After this the server can be used with the link: `http://localhost:<port>/`,
where <port> is the port number that is assigned in `.env` file.

To access GraphQL playground, just open that link in browser.

## Credentials

In order to test the app following credentials can be used to sign in:
```
email: test@user.com
password: worstpass
```
