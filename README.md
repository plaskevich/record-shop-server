# Record Shop Server

GraphQL server for my [Record Shop app](https://github.com/plaskevich/record-shop)

## Run app locally
### 1. Install dependencies
`npm i`
### 2. Set credentials
1. In the root of the project create a file named `.env`
2. Set the .env file with credentials:
```
PORT = <port>
MONGO_URI = <link to mongodb>
```
### 3. Start server
`npm start`

After this the server can be used with the link: `http://localhost:<port>/`,
where <port> is the port number that is assigned in `.env` file.

To access GraphQL playground, just open that link in browser.
