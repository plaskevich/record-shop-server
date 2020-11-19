# Collection

## Get All Records

Query `getAllRecords` returns:

- Array of [Record Objects](../Other/Representations.md#record-object)

#### Example

```graphql
query {
  getAllRecords{ ... }
}
```

## Get Record

Query `getRecord` takes parameters:
- `id`: String

Returns: 
- [Record Object](../Other/Representations.md#record-object)

#### Example

```graphql
query {
  getRecord(id: "id12345"){ ... }
}
```

## Get Stock Records

Query `getStockRecords` returns:

- Array of [Record Objects](../Other/Representations.md#record-object)

#### Example

```graphql
query {
  getStockRecords{ ... }
}
```
## Get Sold Records

Query `getSoldRecords` returns:

- Array of [Record Objects](../Other/Representations.md#record-object)

#### Example

```graphql
query {
  getSoldRecords{ ... }
}
```
