# Collection Management

## Add Record

Mutation `addRecord` takes parameters:
- `data`: [Record](../Other/Input-types#record)

Returns:
-  [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
mutation {
  addRecord(data:{
    artist: "Eminem"
    title: "The Slim Shady LP"
    status: "inStock"
    label: "Aftermath Entertainment, Interscope Records"
    condition: "M"
    genre: "Hip Hop"
    price: "50"
    year: 1999
    notes: "Great album"
    img_uri: "https://img.discogs.com/5TCyESi-bGzoowhfORnnlAVptYU=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7288222-1476800882-5608.jpeg.jpg"
  }){ ... }
}
```

## Edit Record

Mutation `editRecord` takes parameters:
- `id`: String
- `data`: [Record](../Other/Input-types#record)

Returns:
-  [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
mutation {
  editRecord(id: "id12345", data:{
    artist: "Eminem"
    title: "The Slim Shady LP"
    status: "inStock"
    label: "Aftermath Entertainment, Interscope Records"
    condition: "M"
    genre: "Hip Hop"
    price: "50"
    year: 1999
    notes: "Great album"
    img_uri: "https://img.discogs.com/5TCyESi-bGzoowhfORnnlAVptYU=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7288222-1476800882-5608.jpeg.jpg"
  }){ ... }
}
```
## Remove Record

Mutation `removeRecord` takes parameters:
- `id`: String

Returns:
-  [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
mutation {
  removeRecord(id: "id12345"){ ... }
}
```
## Set In-Stock

Mutation `setInStock` takes parameters:
- `id`: String

Returns:
-  [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
mutation {
  setInStock(id: "id12345"){ ... }
}
```

## Set Sold

Mutation `setSold` takes parameters:
- `id`: String

Returns:
-  [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
mutation {
  setSold(id: "id12345"){ ... }
}
```
