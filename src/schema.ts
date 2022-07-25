export const typeDefs =  /* GraphQL */ `
type Query {
  getRecord(id: String!): Record
  getAllRecords: [Record]
  getStockRecords: [Record]
  getSoldRecords: [Record]
  getShopUsers: [User]
  getGenreStatistics: [GenreStatistic]
}

type Mutation {
  signUp(email: String!, password: String!, name: String): AuthData
  signIn(email: String!, password: String!): AuthData
  addShop(name: String!): Shop
  addRecord(data: RecordInput!): Record
  editRecord(id: String!, data: RecordInput!): Record
  setInStock(id: String!): Record
  setSold(id: String!): Record
  removeRecord(id: String!): Record
  addUserToShop(email: String!, role: UserRole!): Boolean
  changeUserRole(userId: String!, role: UserRole!): Boolean
  removeUser(userId: String!): Boolean
}

input LoginInput {
  email: String
  password: String
}

input UserInput {
  email: String
  password: String
  name: String
}

input RecordInput {
  artist: String
  title: String
  status: Status
  label: String
  condition: String
  genre: String
  price: String
  year: Int
  notes: String
  img_uri: String
}

type AuthData {
  token: String
  user: User
}

type User {
  id: String
  email: String
  name: String
  shop: Shop
  role: String
}

type Record {
  id: String
  artist: String
  title: String
  label: String
  status: String
  condition: String
  genre: String
  date_added: String
  price: String
  year: Int
  notes: String
  img_uri: String
}

type Shop {
  id: String
  name: String
}

type GenreStatistic {
  genre: String
  records: [String]
  percent: Float
}

enum Status {
  sold
  inStock
}

enum UserRole {
  admin
  regular
}`
